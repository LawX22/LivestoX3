// services/cartCheckoutService.ts - WITH DELIVERY DATE & TIME SUPPORT
import { supabase } from '../supabase'
import type { 
  Animal,
  Farmer,
  CartItem, 
  SavedAddress, 
  FarmerLocation 
} from '@/types/cartTypes'

// ===== DATABASE INTERFACES =====

interface CartItemDB {
  id: string
  user_id: string
  listing_id: string
  quantity: number
  created_at: string
  updated_at: string
}

interface OrderDB {
  id: string
  user_id: string
  order_number: string
  delivery_method: string
  delivery_address_id: string | null
  farmer_location_id: string | null
  payment_method: string
  subtotal: number
  shipping_fee: number
  cod_fee: number
  total_amount: number
  delivery_notes: string | null
  delivery_date: string | null
  delivery_time: string | null
  status: string
  created_at: string
  updated_at: string
}

interface OrderItemDB {
  id: string
  order_id: string
  listing_id: string
  quantity: number
  price_per_unit: number
  subtotal: number
  created_at: string
}

interface AddressDB {
  id: string
  user_id: string
  full_name: string
  label: string
  phone_number: string
  street: string
  barangay: string
  city: string
  province: string
  region: string
  zip_code: string
  description: string
  is_default: boolean
  created_at: string
  updated_at: string
}

interface ListingDB {
  id: string
  user_id: string
  title: string
  type: string
  breed: string
  weight: number
  weight_unit: string
  quantity: number
  original_quantity: number
  age: string
  gender: string
  status: string
  health_status: string[]
  price: number
  price_unit: string
  location: string
  delivery_options: string[]
  payment_methods: string[]
  images: string[]
  description: string
  created_at: string
}

interface ProfileDB {
  id: string
  first_name: string
  last_name: string
  username: string
  phone: string
  email: string
  address: string
  avatar_url: string
  farm_name: string
}

interface CheckoutData {
  items: CartItem[]
  deliveryMethod: string
  selectedAddressIndex?: number
  selectedFarmerIndex?: number
  paymentMethod: string
  deliveryNotes?: string
  deliveryDate?: string
  deliveryTime?: string
  subtotal: number
  shippingFee: number
  codFee: number
  totalAmount: number
}

interface ApiResponse<T = void> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// ===== CART & CHECKOUT SERVICE =====

class CartCheckoutService {
  
  // =====================
  // CART OPERATIONS
  // =====================

  /**
   * Get all cart items for the current user
   */
  async getCartItems(): Promise<ApiResponse<CartItem[]>> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        return { success: false, error: 'Not authenticated' }
      }

      console.log('🛒 Fetching cart items for user:', user.id)

      // Fetch cart items with joined livestock listing data
      const { data: cartData, error: cartError } = await supabase
        .from('cart_items')
        .select(`
          id,
          listing_id,
          quantity,
          created_at,
          livestock_listings (
            id,
            user_id,
            title,
            type,
            breed,
            weight,
            weight_unit,
            quantity,
            original_quantity,
            age,
            gender,
            status,
            health_status,
            price,
            price_unit,
            location,
            delivery_options,
            payment_methods,
            images,
            description,
            created_at
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (cartError) {
        console.error('❌ Error fetching cart items:', cartError)
        return { success: false, error: cartError.message }
      }

      if (!cartData || cartData.length === 0) {
        console.log('📦 Cart is empty')
        return { success: true, data: [] }
      }

      // Get unique farmer IDs - filter out null/undefined listings first
      const farmerIds = [...new Set(
        cartData
          .filter(item => item.livestock_listings !== null && item.livestock_listings !== undefined)
          .map(item => (item.livestock_listings as any).user_id)
          .filter((id): id is string => typeof id === 'string')
      )]

      // Fetch farmer information
      const { data: farmersData, error: farmersError } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, username, phone, email, address, avatar_url, farm_name')
        .in('id', farmerIds)

      if (farmersError) {
        console.warn('⚠️ Error fetching farmer data:', farmersError)
      }

      // Create farmer lookup map
      const farmerLookup: Record<string, ProfileDB> = {}
      farmersData?.forEach(farmer => {
        farmerLookup[farmer.id] = farmer
      })

      // Transform to CartItem format - filter out items without listings
      const cartItems: CartItem[] = cartData
        .filter(item => item.livestock_listings !== null && item.livestock_listings !== undefined)
        .map(item => {
          const listing = item.livestock_listings as unknown as ListingDB
          const farmer = farmerLookup[listing.user_id]

          const farmerName = farmer?.first_name && farmer?.last_name
            ? `${farmer.first_name} ${farmer.last_name}`
            : farmer?.username || 'Unknown Farmer'

          const farmerInfo: Farmer = {
            id: parseInt(listing.user_id),
            name: farmerName,
            farmName: farmer?.farm_name || `${farmerName}'s Farm`,
            contact: farmer?.phone || '+63 XXX XXX XXXX',
            email: farmer?.email || '',
            address: farmer?.address || listing.location,
            avatar: farmer?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(farmerName)}&background=random`
          }

          const cartItem: CartItem = {
            id: parseInt(listing.id),
            uuid: listing.id,
            title: listing.title,
            type: listing.type,
            breed: listing.breed,
            weight: listing.weight,
            weightUnit: listing.weight_unit || 'kg',
            quantity: item.quantity,
            originalQuantity: listing.original_quantity,
            maxQuantity: listing.quantity,
            age: listing.age,
            gender: listing.gender,
            status: listing.status,
            healthStatus: listing.health_status || [],
            price: listing.price,
            priceUnit: listing.price_unit || 'per head',
            deliveryOptions: listing.delivery_options || [],
            paymentMethods: listing.payment_methods || [],
            images: listing.images || [],
            description: listing.description,
            datePosted: listing.created_at,
            dateAdded: item.created_at,
            farmer: farmerInfo,
            location: listing.location,
            isAuction: false
          }

          return cartItem
        })

      console.log(`✅ Fetched ${cartItems.length} cart items`)
      return { success: true, data: cartItems }
    } catch (error: any) {
      console.error('💥 Error in getCartItems:', error)
      return { success: false, error: error.message || 'Failed to fetch cart items' }
    }
  }

  /**
   * Add item to cart
   */
  async addToCart(listingId: string, quantity: number): Promise<ApiResponse<void>> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        return { success: false, error: 'Not authenticated' }
      }

      console.log('➕ Adding to cart:', { listingId, quantity })

      // Check if item already exists in cart
      const { data: existingItem, error: checkError } = await supabase
        .from('cart_items')
        .select('id, quantity')
        .eq('user_id', user.id)
        .eq('listing_id', listingId)
        .single()

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('❌ Error checking existing cart item:', checkError)
        return { success: false, error: checkError.message }
      }

      // Get listing details to check availability
      const { data: listing, error: listingError } = await supabase
        .from('livestock_listings')
        .select('quantity, status')
        .eq('id', listingId)
        .single()

      if (listingError) {
        return { success: false, error: 'Listing not found' }
      }

      if (listing.status === 'Out of Stock') {
        return { success: false, error: 'Item is out of stock' }
      }

      if (existingItem) {
        // Update existing cart item
        const newQuantity = existingItem.quantity + quantity

        if (newQuantity > listing.quantity) {
          return { 
            success: false, 
            error: `Only ${listing.quantity} units available. You already have ${existingItem.quantity} in cart.` 
          }
        }

        const { error: updateError } = await supabase
          .from('cart_items')
          .update({ 
            quantity: newQuantity,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingItem.id)

        if (updateError) {
          console.error('❌ Error updating cart item:', updateError)
          return { success: false, error: updateError.message }
        }

        console.log('✅ Cart item quantity updated')
        return { 
          success: true, 
          message: `Cart updated! Now you have ${newQuantity} units.` 
        }
      } else {
        // Add new cart item
        if (quantity > listing.quantity) {
          return { 
            success: false, 
            error: `Only ${listing.quantity} units available` 
          }
        }

        const { error: insertError } = await supabase
          .from('cart_items')
          .insert({
            user_id: user.id,
            listing_id: listingId,
            quantity: quantity
          })

        if (insertError) {
          console.error('❌ Error adding to cart:', insertError)
          return { success: false, error: insertError.message }
        }

        console.log('✅ Item added to cart')
        return { 
          success: true, 
          message: `${quantity} item(s) added to cart!` 
        }
      }
    } catch (error: any) {
      console.error('💥 Error in addToCart:', error)
      return { success: false, error: error.message || 'Failed to add item to cart' }
    }
  }

  /**
   * Update cart item quantity
   */
  async updateCartQuantity(listingId: string, quantity: number): Promise<ApiResponse<void>> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        return { success: false, error: 'Not authenticated' }
      }

      console.log('📝 Updating cart quantity:', { listingId, quantity })

      // Get listing to check availability
      const { data: listing, error: listingError } = await supabase
        .from('livestock_listings')
        .select('quantity')
        .eq('id', listingId)
        .single()

      if (listingError) {
        return { success: false, error: 'Listing not found' }
      }

      if (quantity > listing.quantity) {
        return { 
          success: false, 
          error: `Only ${listing.quantity} units available` 
        }
      }

      if (quantity < 1) {
        return { success: false, error: 'Quantity must be at least 1' }
      }

      const { error: updateError } = await supabase
        .from('cart_items')
        .update({ 
          quantity,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .eq('listing_id', listingId)

      if (updateError) {
        console.error('❌ Error updating cart quantity:', updateError)
        return { success: false, error: updateError.message }
      }

      console.log('✅ Cart quantity updated')
      return { success: true, message: 'Quantity updated successfully' }
    } catch (error: any) {
      console.error('💥 Error in updateCartQuantity:', error)
      return { success: false, error: error.message || 'Failed to update quantity' }
    }
  }

  /**
   * Remove item from cart
   */
  async removeFromCart(listingId: string): Promise<ApiResponse<void>> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        return { success: false, error: 'Not authenticated' }
      }

      console.log('🗑️ Removing from cart:', listingId)

      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id)
        .eq('listing_id', listingId)

      if (error) {
        console.error('❌ Error removing from cart:', error)
        return { success: false, error: error.message }
      }

      console.log('✅ Item removed from cart')
      return { success: true, message: 'Item removed from cart' }
    } catch (error: any) {
      console.error('💥 Error in removeFromCart:', error)
      return { success: false, error: error.message || 'Failed to remove item' }
    }
  }

  /**
   * Clear entire cart
   */
  async clearCart(): Promise<ApiResponse<void>> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        return { success: false, error: 'Not authenticated' }
      }

      console.log('🧹 Clearing cart for user:', user.id)

      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id)

      if (error) {
        console.error('❌ Error clearing cart:', error)
        return { success: false, error: error.message }
      }

      console.log('✅ Cart cleared')
      return { success: true, message: 'Cart cleared successfully' }
    } catch (error: any) {
      console.error('💥 Error in clearCart:', error)
      return { success: false, error: error.message || 'Failed to clear cart' }
    }
  }

  /**
   * Get cart count
   */
  async getCartCount(): Promise<ApiResponse<number>> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        return { success: true, data: 0 }
      }

      const { count, error } = await supabase
        .from('cart_items')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)

      if (error) {
        console.error('Error getting cart count:', error)
        return { success: false, error: error.message }
      }

      return { success: true, data: count || 0 }
    } catch (error: any) {
      console.error('Error in getCartCount:', error)
      return { success: false, error: error.message || 'Failed to get cart count' }
    }
  }

  // =====================
  // ADDRESS MANAGEMENT
  // =====================

  /**
   * Get all saved addresses for user
   */
  async getSavedAddresses(): Promise<ApiResponse<SavedAddress[]>> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        return { success: false, error: 'Not authenticated' }
      }

      console.log('📍 Fetching saved addresses for user:', user.id)

      const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', user.id)
        .order('is_default', { ascending: false })
        .order('created_at', { ascending: false })

      if (error) {
        console.error('❌ Error fetching addresses:', error)
        return { success: false, error: error.message }
      }

      // Map database structure to SavedAddress interface
      const addresses: SavedAddress[] = (data || []).map(addr => ({
        label: addr.label || 'Home',
        contactPerson: addr.full_name,
        phone: addr.phone_number,
        street: addr.barangay ? `${addr.street}, ${addr.barangay}` : addr.street,
        city: addr.city,
        province: addr.province,
        postalCode: addr.zip_code,
        isDefault: addr.is_default
      }))

      console.log(`✅ Fetched ${addresses.length} addresses`)
      return { success: true, data: addresses }
    } catch (error: any) {
      console.error('💥 Error in getSavedAddresses:', error)
      return { success: false, error: error.message || 'Failed to fetch addresses' }
    }
  }

  /**
   * Add new address
   */
  async addAddress(address: SavedAddress): Promise<ApiResponse<void>> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        return { success: false, error: 'Not authenticated' }
      }

      console.log('➕ Adding new address')

      // If this is set as default, unset all other defaults first
      if (address.isDefault) {
        await supabase
          .from('addresses')
          .update({ is_default: false })
          .eq('user_id', user.id)
      }

      // Split street into street and barangay if comma exists
      const streetParts = address.street.split(',').map(s => s.trim())
      const street = streetParts[0] || address.street
      const barangay = streetParts[1] || ''

      const { error } = await supabase
        .from('addresses')
        .insert({
          user_id: user.id,
          label: address.label,
          full_name: address.contactPerson,
          phone_number: address.phone,
          street: street,
          barangay: barangay,
          city: address.city,
          province: address.province,
          region: '',
          zip_code: address.postalCode,
          description: '',
          is_default: address.isDefault
        })

      if (error) {
        console.error('❌ Error adding address:', error)
        return { success: false, error: error.message }
      }

      console.log('✅ Address added successfully')
      return { success: true, message: 'Address added successfully' }
    } catch (error: any) {
      console.error('💥 Error in addAddress:', error)
      return { success: false, error: error.message || 'Failed to add address' }
    }
  }

  /**
   * Update existing address
   */
  async updateAddress(addressId: string, updates: Partial<SavedAddress>): Promise<ApiResponse<void>> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        return { success: false, error: 'Not authenticated' }
      }

      console.log('📝 Updating address:', addressId)

      // If this is being set as default, unset all other defaults first
      if (updates.isDefault) {
        await supabase
          .from('addresses')
          .update({ is_default: false })
          .eq('user_id', user.id)
      }

      const updateData: Partial<AddressDB> = {
        updated_at: new Date().toISOString()
      }

      if (updates.label !== undefined) updateData.label = updates.label
      if (updates.contactPerson !== undefined) updateData.full_name = updates.contactPerson
      if (updates.phone !== undefined) updateData.phone_number = updates.phone
      if (updates.street !== undefined) {
        const streetParts = updates.street.split(',').map(s => s.trim())
        updateData.street = streetParts[0] || updates.street
        updateData.barangay = streetParts[1] || ''
      }
      if (updates.city !== undefined) updateData.city = updates.city
      if (updates.province !== undefined) updateData.province = updates.province
      if (updates.postalCode !== undefined) updateData.zip_code = updates.postalCode
      if (updates.isDefault !== undefined) updateData.is_default = updates.isDefault

      const { error } = await supabase
        .from('addresses')
        .update(updateData)
        .eq('id', addressId)
        .eq('user_id', user.id)

      if (error) {
        console.error('❌ Error updating address:', error)
        return { success: false, error: error.message }
      }

      console.log('✅ Address updated successfully')
      return { success: true, message: 'Address updated successfully' }
    } catch (error: any) {
      console.error('💥 Error in updateAddress:', error)
      return { success: false, error: error.message || 'Failed to update address' }
    }
  }

  /**
   * Delete address
   */
  async deleteAddress(addressId: string): Promise<ApiResponse<void>> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        return { success: false, error: 'Not authenticated' }
      }

      console.log('🗑️ Deleting address:', addressId)

      const { error } = await supabase
        .from('addresses')
        .delete()
        .eq('id', addressId)
        .eq('user_id', user.id)

      if (error) {
        console.error('❌ Error deleting address:', error)
        return { success: false, error: error.message }
      }

      console.log('✅ Address deleted successfully')
      return { success: true, message: 'Address deleted successfully' }
    } catch (error: any) {
      console.error('💥 Error in deleteAddress:', error)
      return { success: false, error: error.message || 'Failed to delete address' }
    }
  }

  // =====================
  // FARMER LOCATIONS (for pickup)
  // =====================

  /**
   * Get farmer locations from selected cart items
   */
  async getFarmerLocations(cartItems: CartItem[]): Promise<ApiResponse<FarmerLocation[]>> {
    try {
      console.log('📍 Getting farmer locations from cart items')

      // Get unique farmer IDs from cart items
      const farmerIds = [...new Set(cartItems.map(item => item.farmer.id.toString()))]

      if (farmerIds.length === 0) {
        return { success: true, data: [] }
      }

      // Fetch farmer details
      const { data: farmersData, error } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, username, phone, address, farm_name')
        .in('id', farmerIds)

      if (error) {
        console.error('❌ Error fetching farmer locations:', error)
        return { success: false, error: error.message }
      }

      const locations: FarmerLocation[] = (farmersData || []).map(farmer => {
        const farmerName = farmer.first_name && farmer.last_name
          ? `${farmer.first_name} ${farmer.last_name}`
          : farmer.username || 'Unknown Farmer'

        return {
          farmerId: parseInt(farmer.id),
          farmerName,
          farmName: farmer.farm_name || `${farmerName}'s Farm`,
          address: farmer.address || 'Address not available',
          phone: farmer.phone || '+63 XXX XXX XXXX',
          hours: 'Mon-Sat: 8:00 AM - 5:00 PM',
          distance: 'Contact for details'
        }
      })

      console.log(`✅ Fetched ${locations.length} farmer locations`)
      return { success: true, data: locations }
    } catch (error: any) {
      console.error('💥 Error in getFarmerLocations:', error)
      return { success: false, error: error.message || 'Failed to fetch farmer locations' }
    }
  }

  // =====================
  // CHECKOUT & ORDERS
  // =====================

  /**
   * Create order from checkout data
   */
  async createOrder(checkoutData: CheckoutData): Promise<ApiResponse<string>> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        return { success: false, error: 'Not authenticated' }
      }

      console.log('📦 Creating order...')
      console.log('📅 Delivery Date:', checkoutData.deliveryDate)
      console.log('🕐 Delivery Time:', checkoutData.deliveryTime)

      // Generate order number
      const orderNumber = 'ORD-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 8).toUpperCase()

      // Get delivery address ID
      let deliveryAddressId: string | null = null
      if (checkoutData.deliveryMethod === 'delivery' && checkoutData.selectedAddressIndex !== undefined) {
        const addressesResult = await this.getSavedAddresses()
        if (addressesResult.success && addressesResult.data) {
          const address = addressesResult.data[checkoutData.selectedAddressIndex]
          
          // Get the actual address ID from database
          const { data: addressData } = await supabase
            .from('addresses')
            .select('id')
            .eq('user_id', user.id)
            .eq('full_name', address.contactPerson)
            .eq('phone_number', address.phone)
            .limit(1)
            .single()
          
          deliveryAddressId = addressData?.id || null
        }
      }

      // Create order in database
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          order_number: orderNumber,
          delivery_method: checkoutData.deliveryMethod,
          delivery_address_id: deliveryAddressId,
          payment_method: checkoutData.paymentMethod,
          subtotal: checkoutData.subtotal,
          shipping_fee: checkoutData.shippingFee,
          cod_fee: checkoutData.codFee,
          total_amount: checkoutData.totalAmount,
          delivery_notes: checkoutData.deliveryNotes || null,
          delivery_date: checkoutData.deliveryDate || null,
          delivery_time: checkoutData.deliveryTime || null,
          status: 'pending'
        })
        .select('id')
        .single()

      if (orderError) {
        console.error('❌ Error creating order:', orderError)
        return { success: false, error: orderError.message }
      }

      const orderId = orderData.id

      // Create order items
      const orderItems = checkoutData.items.map(item => ({
        order_id: orderId,
        listing_id: item.uuid,
        quantity: item.quantity,
        price_per_unit: item.price,
        subtotal: item.price * item.quantity
      }))

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems)

      if (itemsError) {
        console.error('❌ Error creating order items:', itemsError)
        // Rollback: delete the order
        await supabase.from('orders').delete().eq('id', orderId)
        return { success: false, error: itemsError.message }
      }

      // Update livestock quantities
      for (const item of checkoutData.items) {
        const { data: listing } = await supabase
          .from('livestock_listings')
          .select('quantity, original_quantity')
          .eq('id', item.uuid)
          .single()

        if (listing) {
          const newQuantity = listing.quantity - item.quantity
          const newStatus = this.calculateStatus(newQuantity, listing.original_quantity)

          await supabase
            .from('livestock_listings')
            .update({
              quantity: newQuantity,
              status: newStatus
            })
            .eq('id', item.uuid)
        }
      }

      // Remove items from cart
      const listingIds = checkoutData.items.map(item => item.uuid)
      await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id)
        .in('listing_id', listingIds)

      console.log('✅ Order created successfully:', orderNumber)
      return { success: true, data: orderNumber, message: 'Order placed successfully' }
    } catch (error: any) {
      console.error('💥 Error in createOrder:', error)
      return { success: false, error: error.message || 'Failed to create order' }
    }
  }

  /**
   * Calculate status based on quantity
   */
  private calculateStatus(quantity: number, originalQuantity: number): string {
    if (quantity === 0) {
      return 'Out of Stock'
    }
    
    const threshold = this.getLowStockThreshold(originalQuantity)
    
    if (quantity <= threshold) {
      return 'Low Stock'
    }
    
    return 'Available'
  }

  /**
   * Get low stock threshold
   */
  private getLowStockThreshold(originalQuantity: number): number {
    if (originalQuantity <= 5) {
      return 2
    } else if (originalQuantity <= 10) {
      return 3
    } else if (originalQuantity <= 20) {
      return 5
    } else if (originalQuantity <= 50) {
      return 10
    } else if (originalQuantity <= 100) {
      return Math.ceil(originalQuantity * 0.20)
    } else {
      return Math.ceil(originalQuantity * 0.15)
    }
  }

  /**
   * Get user's orders
   */
  async getMyOrders(): Promise<ApiResponse<any[]>> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        return { success: false, error: 'Not authenticated' }
      }

      console.log('📋 Fetching orders for user:', user.id)

      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            livestock_listings (*)
          ),
          addresses (*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('❌ Error fetching orders:', error)
        return { success: false, error: error.message }
      }

      console.log(`✅ Fetched ${data?.length || 0} orders`)
      return { success: true, data: data || [] }
    } catch (error: any) {
      console.error('💥 Error in getMyOrders:', error)
      return { success: false, error: error.message || 'Failed to fetch orders' }
    }
  }

  /**
   * Get single order by order number
   */
  async getOrder(orderNumber: string): Promise<ApiResponse<any>> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        return { success: false, error: 'Not authenticated' }
      }

      console.log('📋 Fetching order:', orderNumber)

      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            livestock_listings (*)
          ),
          addresses (*)
        `)
        .eq('user_id', user.id)
        .eq('order_number', orderNumber)
        .single()

      if (error) {
        console.error('❌ Error fetching order:', error)
        return { success: false, error: error.message }
      }

      console.log('✅ Order fetched successfully')
      return { success: true, data }
    } catch (error: any) {
      console.error('💥 Error in getOrder:', error)
      return { success: false, error: error.message || 'Failed to fetch order' }
    }
  }

  /**
   * Cancel order
   */
  async cancelOrder(orderNumber: string): Promise<ApiResponse<void>> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        return { success: false, error: 'Not authenticated' }
      }

      console.log('❌ Cancelling order:', orderNumber)

      // Get order details
      const { data: order, error: fetchError } = await supabase
        .from('orders')
        .select('id, status, order_items(*)')
        .eq('user_id', user.id)
        .eq('order_number', orderNumber)
        .single()

      if (fetchError) {
        return { success: false, error: 'Order not found' }
      }

      if (order.status !== 'pending') {
        return { success: false, error: 'Only pending orders can be cancelled' }
      }

      // Update order status
      const { error: updateError } = await supabase
        .from('orders')
        .update({ 
          status: 'cancelled',
          updated_at: new Date().toISOString()
        })
        .eq('id', order.id)

      if (updateError) {
        console.error('❌ Error cancelling order:', updateError)
        return { success: false, error: updateError.message }
      }

      // Restore livestock quantities
      for (const item of order.order_items) {
        const { data: listing } = await supabase
          .from('livestock_listings')
          .select('quantity, original_quantity')
          .eq('id', item.listing_id)
          .single()

        if (listing) {
          const newQuantity = listing.quantity + item.quantity
          const newStatus = this.calculateStatus(newQuantity, listing.original_quantity)

          await supabase
            .from('livestock_listings')
            .update({
              quantity: newQuantity,
              status: newStatus
            })
            .eq('id', item.listing_id)
        }
      }

      console.log('✅ Order cancelled successfully')
      return { success: true, message: 'Order cancelled successfully' }
    } catch (error: any) {
      console.error('💥 Error in cancelOrder:', error)
      return { success: false, error: error.message || 'Failed to cancel order' }
    }
  }
}

// ===== EXPORT SINGLETON INSTANCE =====
export const cartCheckoutService = new CartCheckoutService()

// ===== RE-EXPORT TYPES =====
export type { CartItem, SavedAddress, FarmerLocation, CheckoutData }