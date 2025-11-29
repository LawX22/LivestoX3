// services/transactionService.ts - COMPLETE VERSION WITH AUTOMATIC QUANTITY DEDUCTION
import { supabase } from '../supabase'
import type { 
  FarmerTransaction, 
  BuyerTransaction,
  Animal,
  Farmer,
  Buyer,
  DeliveryAddress,
  PickupSchedule,
  ShippingUpdate
} from '@/types/transactionTypes'

// ===== DATABASE INTERFACES =====

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
  current_shipping_status: string | null
  estimated_delivery_date: string | null
  actual_delivery_date: string | null
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
  first_name: string | null
  last_name: string | null
  username: string
  phone_number: string | null
  email: string
  address: string | null
  profile_picture: string | null
  farm_name: string | null
  role: string
}

interface FarmInfoDB {
  id: string
  user_id: string
  farm_name: string
  farm_size: number
  farm_size_unit: string
  livestock_types: string[]
  description: string
  street: string
  barangay: string
  city: string
  province: string
  region: string
  created_at: string
  updated_at: string
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
}

interface ShippingUpdateDB {
  id: string
  order_number: string
  status: string
  message: string
  location: string | null
  created_at: string
  created_by: string | null
}

interface ApiResponse<T = void> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// ===== TRANSACTION SERVICE CLASS =====

class TransactionService {
  
  private farmInfoCache: Map<string, FarmInfoDB | null> = new Map()

  private async getFarmInfo(userId: string): Promise<FarmInfoDB | null> {
    if (this.farmInfoCache.has(userId)) {
      return this.farmInfoCache.get(userId) || null
    }

    try {
      const { data, error } = await supabase
        .from('farm_info')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          this.farmInfoCache.set(userId, null)
          return null
        }
        console.warn('⚠️ Error fetching farm info:', error)
        return null
      }

      this.farmInfoCache.set(userId, data as FarmInfoDB)
      return data as FarmInfoDB
    } catch (error) {
      console.error('Error in getFarmInfo:', error)
      return null
    }
  }

  private parsePickupSchedule(deliveryOptions: string[] | null): PickupSchedule | undefined {
    if (!deliveryOptions || !Array.isArray(deliveryOptions)) return undefined

    for (const option of deliveryOptions) {
      if (typeof option === 'string' && option.startsWith('pickup:')) {
        const match = option.match(/^pickup:([^:]+):(\d{2}:\d{2}):(\d{2}:\d{2})$/)
        
        if (match) {
          const [, daysStr, startTime, endTime] = match
          const days = daysStr.split('|').filter(day => day.trim().length > 0)
          
          if (days.length > 0) {
            return {
              availableDays: days,
              startTime,
              endTime
            }
          }
        }
      }
    }
    
    return undefined
  }

  private dbAddressToDeliveryAddress(dbAddr: AddressDB): DeliveryAddress {
    return {
      label: dbAddr.label,
      contactPerson: dbAddr.full_name,
      phone: dbAddr.phone_number,
      street: dbAddr.barangay ? `${dbAddr.street}, ${dbAddr.barangay}` : dbAddr.street,
      city: dbAddr.city,
      province: dbAddr.province,
      postalCode: dbAddr.zip_code
    }
  }

  private async profileToFarmer(profile: ProfileDB): Promise<Farmer> {
    const displayName = profile.first_name && profile.last_name
      ? `${profile.first_name} ${profile.last_name}`
      : profile.username

    const farmInfo = await this.getFarmInfo(profile.id)
    const farmName = farmInfo?.farm_name || profile.farm_name || `${displayName}'s Farm`

    return {
      id: parseInt(profile.id) || 0,
      name: displayName,
      farmName: farmName,
      contact: profile.phone_number || '+63 XXX XXX XXXX',
      email: profile.email || '',
      address: profile.address || 'Address not available',
      avatar: profile.profile_picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=random`
    }
  }

  private async profileToBuyer(profile: ProfileDB): Promise<Buyer> {
    const displayName = profile.first_name && profile.last_name
      ? `${profile.first_name} ${profile.last_name}`
      : profile.username

    let farmName: string | undefined = undefined
    if (profile.role === 'Farmer') {
      const farmInfo = await this.getFarmInfo(profile.id)
      farmName = farmInfo?.farm_name || profile.farm_name || undefined
    }

    return {
      id: parseInt(profile.id) || 0,
      name: displayName,
      contact: profile.phone_number || '+63 XXX XXX XXXX',
      email: profile.email || '',
      address: profile.address || 'Address not available',
      avatar: profile.profile_picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=random`,
      farm: farmName
    }
  }

  private async listingToAnimal(
    listing: ListingDB, 
    farmerProfile: ProfileDB, 
    orderedQuantity: number,
    orderedPrice: number
  ): Promise<Animal> {
    const farmer = await this.profileToFarmer(farmerProfile)

    return {
      id: parseInt(listing.id) || 0,
      uuid: listing.id,
      title: listing.title,
      type: listing.type,
      breed: listing.breed,
      weight: listing.weight,
      weightUnit: listing.weight_unit || 'kg',
      quantity: orderedQuantity,
      originalQuantity: listing.original_quantity,
      age: listing.age,
      gender: listing.gender,
      status: listing.status,
      healthStatus: listing.health_status || [],
      price: orderedPrice,
      priceUnit: listing.price_unit || 'per head',
      deliveryOptions: listing.delivery_options || [],
      paymentMethods: listing.payment_methods || [],
      images: listing.images || [],
      description: listing.description,
      datePosted: listing.created_at,
      farmer,
      location: listing.location,
      isAuction: false
    }
  }

  private dbShippingUpdatesToShippingUpdates(updates: ShippingUpdateDB[]): ShippingUpdate[] {
    return updates.map(update => ({
      status: update.status as any,
      message: update.message,
      location: update.location || undefined,
      timestamp: update.created_at
    }))
  }

  private async getShippingUpdates(orderNumber: string): Promise<ShippingUpdate[]> {
    try {
      const { data, error } = await supabase
        .from('shipping_updates')
        .select('*')
        .eq('order_number', orderNumber)
        .order('created_at', { ascending: true })

      if (error) {
        console.warn('⚠️ Error fetching shipping updates:', error)
        return []
      }

      return this.dbShippingUpdatesToShippingUpdates(data || [])
    } catch (error) {
      console.error('Error getting shipping updates:', error)
      return []
    }
  }

  private mapDbStatusToFarmerStatus(dbStatus: string): 'Pending' | 'Accepted' | 'Rejected' | 'Completed' {
    switch (dbStatus) {
      case 'pending':
        return 'Pending'
      case 'confirmed':
      case 'processing':
      case 'packed':
        return 'Accepted'
      case 'shipped':
      case 'in_transit':
      case 'out_for_delivery':
      case 'ready_for_pickup':
        return 'Accepted'
      case 'completed':
      case 'delivered':
      case 'picked_up':
        return 'Completed'
      case 'cancelled':
        return 'Rejected'
      default:
        return 'Pending'
    }
  }

  private mapDbStatusToBuyerStatus(dbStatus: string): 'Pending' | 'Accepted' | 'Shipped' | 'Completed' | 'Cancelled' {
    switch (dbStatus) {
      case 'pending':
        return 'Pending'
      case 'confirmed':
      case 'processing':
      case 'packed':
        return 'Accepted'
      case 'shipped':
      case 'in_transit':
      case 'out_for_delivery':
      case 'ready_for_pickup':
        return 'Shipped'
      case 'completed':
      case 'delivered':
      case 'picked_up':
        return 'Completed'
      case 'cancelled':
        return 'Cancelled'
      default:
        return 'Pending'
    }
  }

  // ===== QUANTITY MANAGEMENT HELPERS =====

  /**
   * Calculate the low stock threshold based on original quantity
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
   * Calculate status based on quantity with dynamic thresholds
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
   * ✅ NEW: Deduct quantity from listing when order is placed
   * This is called automatically when an order transitions from 'pending' to 'confirmed'
   */
  private async deductListingQuantity(
    listingId: string, 
    quantityToDeduct: number
  ): Promise<{ success: boolean; error?: string; newQuantity?: number; newStatus?: string }> {
    try {
      console.log(`📦 Deducting ${quantityToDeduct} from listing ${listingId}`)

      // Fetch current listing
      const { data: listing, error: fetchError } = await supabase
        .from('livestock_listings')
        .select('quantity, original_quantity, status')
        .eq('id', listingId)
        .single()

      if (fetchError) {
        console.error('❌ Error fetching listing:', fetchError)
        return { success: false, error: 'Listing not found' }
      }

      const currentQuantity = listing.quantity
      const newQuantity = currentQuantity - quantityToDeduct

      // Validate we have enough stock
      if (newQuantity < 0) {
        console.error('❌ Insufficient stock:', { current: currentQuantity, requested: quantityToDeduct })
        return { success: false, error: 'Insufficient stock available' }
      }

      // Calculate new status
      const newStatus = this.calculateStatus(newQuantity, listing.original_quantity)

      console.log('📊 Quantity update:', {
        listingId,
        oldQuantity: currentQuantity,
        deducted: quantityToDeduct,
        newQuantity,
        oldStatus: listing.status,
        newStatus
      })

      // Update the listing
      const { error: updateError } = await supabase
        .from('livestock_listings')
        .update({
          quantity: newQuantity,
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', listingId)

      if (updateError) {
        console.error('❌ Error updating listing quantity:', updateError)
        return { success: false, error: updateError.message }
      }

      console.log('✅ Quantity deducted successfully:', { newQuantity, newStatus })
      return { success: true, newQuantity, newStatus }
    } catch (error: any) {
      console.error('💥 Error in deductListingQuantity:', error)
      return { success: false, error: error.message || 'Failed to deduct quantity' }
    }
  }

  /**
   * ✅ NEW: Restore quantity to listing when order is cancelled
   */
  private async restoreListingQuantity(
    listingId: string, 
    quantityToRestore: number
  ): Promise<{ success: boolean; error?: string }> {
    try {
      console.log(`📦 Restoring ${quantityToRestore} to listing ${listingId}`)

      // Fetch current listing
      const { data: listing, error: fetchError } = await supabase
        .from('livestock_listings')
        .select('quantity, original_quantity')
        .eq('id', listingId)
        .single()

      if (fetchError) {
        console.error('❌ Error fetching listing:', fetchError)
        return { success: false, error: 'Listing not found' }
      }

      const newQuantity = listing.quantity + quantityToRestore
      const newStatus = this.calculateStatus(newQuantity, listing.original_quantity)

      console.log('📊 Quantity restoration:', {
        listingId,
        oldQuantity: listing.quantity,
        restored: quantityToRestore,
        newQuantity,
        newStatus
      })

      // Update the listing
      const { error: updateError } = await supabase
        .from('livestock_listings')
        .update({
          quantity: newQuantity,
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', listingId)

      if (updateError) {
        console.error('❌ Error restoring listing quantity:', updateError)
        return { success: false, error: updateError.message }
      }

      console.log('✅ Quantity restored successfully:', { newQuantity, newStatus })
      return { success: true }
    } catch (error: any) {
      console.error('💥 Error in restoreListingQuantity:', error)
      return { success: false, error: error.message || 'Failed to restore quantity' }
    }
  }

  async getFarmerTransactions(): Promise<ApiResponse<FarmerTransaction[]>> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        return { success: false, error: 'Not authenticated' }
      }

      console.log('🚜 Fetching farmer transactions for user:', user.id)

      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            livestock_listings (*)
          ),
          addresses (*)
        `)
        .order('created_at', { ascending: false })

      if (ordersError) {
        console.error('❌ Error fetching orders:', ordersError)
        return { success: false, error: ordersError.message }
      }

      const farmerOrders = (orders || []).filter(order => {
        return order.order_items?.some((item: any) => 
          item.livestock_listings?.user_id === user.id
        )
      })

      const buyerIds = [...new Set(farmerOrders.map(order => order.user_id))]

      const { data: buyerProfiles, error: buyerError } = await supabase
        .from('profiles')
        .select('*')
        .in('id', buyerIds)

      if (buyerError) {
        console.warn('⚠️ Error fetching buyer profiles:', buyerError)
      }

      const buyerProfileMap: Record<string, ProfileDB> = {}
      buyerProfiles?.forEach(profile => {
        buyerProfileMap[profile.id] = profile
      })

      const { data: farmerProfile, error: farmerError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (farmerError) {
        console.error('❌ Error fetching farmer profile:', farmerError)
        return { success: false, error: farmerError.message }
      }

      const transactions: FarmerTransaction[] = []

      for (const order of farmerOrders) {
        const farmerItem = order.order_items?.find((item: any) => 
          item.livestock_listings?.user_id === user.id
        )

        if (!farmerItem || !farmerItem.livestock_listings) continue

        const listing = farmerItem.livestock_listings
        const buyerProfile = buyerProfileMap[order.user_id]
        
        if (!buyerProfile) continue

        const orderedQuantity = farmerItem.quantity
        const orderedPrice = farmerItem.price_per_unit
        
        const animal = await this.listingToAnimal(listing, farmerProfile, orderedQuantity, orderedPrice)
        const buyer = await this.profileToBuyer(buyerProfile)

        let deliveryAddress: DeliveryAddress | undefined
        if (order.addresses) {
          deliveryAddress = this.dbAddressToDeliveryAddress(order.addresses)
        }

        const pickupSchedule = this.parsePickupSchedule(listing.delivery_options)
        const shippingUpdates = await this.getShippingUpdates(order.order_number)

        const status = this.mapDbStatusToFarmerStatus(order.status)

        const transaction: FarmerTransaction = {
          id: order.order_number,
          animal,
          buyer,
          date: order.created_at,
          status,
          amount: farmerItem.subtotal,
          paymentMethod: order.payment_method,
          deliveryMethod: order.delivery_method,
          quantity: orderedQuantity,
          message: order.delivery_notes || undefined,
          hasReceipt: false,
          deliveryAddress,
          deliveryDate: order.delivery_date || undefined,
          deliveryTime: order.delivery_time || undefined,
          deliveryNotes: order.delivery_notes || undefined,
          pickupSchedule,
          shippingFee: order.shipping_fee,
          shippingUpdates,
          currentShippingStatus: order.current_shipping_status || undefined,
          estimatedDeliveryDate: order.estimated_delivery_date || undefined,
          actualDeliveryDate: order.actual_delivery_date || undefined
        }

        transactions.push(transaction)
      }

      console.log(`✅ Processed ${transactions.length} farmer transactions`)
      return { success: true, data: transactions }
    } catch (error: any) {
      console.error('💥 Error in getFarmerTransactions:', error)
      return { success: false, error: error.message || 'Failed to fetch farmer transactions' }
    }
  }

  async getBuyerTransactions(): Promise<ApiResponse<BuyerTransaction[]>> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        return { success: false, error: 'Not authenticated' }
      }

      console.log('🛒 Fetching buyer transactions for user:', user.id)

      const { data: orders, error: ordersError } = await supabase
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

      if (ordersError) {
        console.error('❌ Error fetching orders:', ordersError)
        return { success: false, error: ordersError.message }
      }

      const farmerIds = [...new Set(
        (orders || [])
          .flatMap(order => order.order_items || [])
          .map((item: any) => item.livestock_listings?.user_id)
          .filter((id): id is string => !!id)
      )]

      const { data: farmerProfiles, error: farmerError } = await supabase
        .from('profiles')
        .select('*')
        .in('id', farmerIds)

      if (farmerError) {
        console.warn('⚠️ Error fetching farmer profiles:', farmerError)
      }

      const farmerProfileMap: Record<string, ProfileDB> = {}
      farmerProfiles?.forEach(profile => {
        farmerProfileMap[profile.id] = profile
      })

      const transactions: BuyerTransaction[] = []

      for (const order of orders || []) {
        for (const item of order.order_items || []) {
          const listing = item.livestock_listings
          if (!listing) continue

          const farmerProfile = farmerProfileMap[listing.user_id]
          if (!farmerProfile) continue

          const orderedQuantity = item.quantity
          const orderedPrice = item.price_per_unit
          
          const animal = await this.listingToAnimal(listing, farmerProfile, orderedQuantity, orderedPrice)
          const farmer = await this.profileToFarmer(farmerProfile)

          let deliveryAddress: DeliveryAddress | undefined
          if (order.addresses) {
            deliveryAddress = this.dbAddressToDeliveryAddress(order.addresses)
          }

          const pickupSchedule = this.parsePickupSchedule(listing.delivery_options)
          const shippingUpdates = await this.getShippingUpdates(order.order_number)

          const status = this.mapDbStatusToBuyerStatus(order.status)

          let estimatedDelivery: string | undefined
          if (order.delivery_method === 'delivery' && order.delivery_date) {
            estimatedDelivery = order.delivery_date
          } else if (order.delivery_method === 'delivery') {
            const orderDate = new Date(order.created_at)
            orderDate.setDate(orderDate.getDate() + 3)
            estimatedDelivery = orderDate.toISOString()
          }

          const transaction: BuyerTransaction = {
            id: order.order_number,
            animal,
            farmer,
            date: order.created_at,
            status,
            amount: item.subtotal,
            paymentMethod: order.payment_method,
            deliveryMethod: order.delivery_method,
            quantity: orderedQuantity,
            estimatedDelivery,
            trackingNumber: `TRK-${order.order_number}`,
            hasReceipt: false,
            deliveryAddress,
            deliveryDate: order.delivery_date || undefined,
            deliveryTime: order.delivery_time || undefined,
            deliveryNotes: order.delivery_notes || undefined,
            pickupSchedule,
            shippingFee: order.shipping_fee,
            shippingUpdates,
            currentShippingStatus: order.current_shipping_status || undefined,
            estimatedDeliveryDate: order.estimated_delivery_date || undefined,
            actualDeliveryDate: order.actual_delivery_date || undefined
          }

          transactions.push(transaction)
        }
      }

      console.log(`✅ Processed ${transactions.length} buyer transactions`)
      return { success: true, data: transactions }
    } catch (error: any) {
      console.error('💥 Error in getBuyerTransactions:', error)
      return { success: false, error: error.message || 'Failed to fetch buyer transactions' }
    }
  }

  private getShippingStatusMessage(status: string): string {
    const messages: Record<string, string> = {
      'confirmed': 'Order confirmed and being prepared',
      'processing': 'Order is being processed',
      'packed': 'Order has been packed and ready for shipment',
      'shipped': 'Order has been shipped',
      'in_transit': 'Order is in transit to destination',
      'out_for_delivery': 'Order is out for delivery',
      'ready_for_pickup': 'Order is ready for pickup at farm location',
      'delivered': 'Order has been delivered successfully',
      'picked_up': 'Order has been picked up by buyer',
      'completed': 'Order completed and confirmed'
    }
    return messages[status] || 'Status updated'
  }

  async addShippingUpdate(
    orderNumber: string,
    status: string,
    message: string,
    location?: string
  ): Promise<ApiResponse<void>> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      const { error } = await supabase
        .from('shipping_updates')
        .insert({
          order_number: orderNumber,
          status,
          message,
          location: location || null,
          created_by: user?.id || null
        })

      if (error) {
        console.error('❌ Error adding shipping update:', error)
        return { success: false, error: error.message }
      }

      console.log('✅ Shipping update added')
      return { success: true }
    } catch (error: any) {
      console.error('💥 Error in addShippingUpdate:', error)
      return { success: false, error: error.message || 'Failed to add shipping update' }
    }
  }

  /**
   * ✅ UPDATED: Now automatically deducts quantity when order is confirmed
   */
  async updateOrderStatus(
    orderNumber: string, 
    newStatus: 'confirmed' | 'processing' | 'packed' | 'shipped' | 'in_transit' | 'out_for_delivery' | 'cancelled' | 'completed'
  ): Promise<ApiResponse<void>> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        return { success: false, error: 'Not authenticated' }
      }

      console.log('📝 Updating order status:', orderNumber, 'to', newStatus)

      const { data: order, error: fetchError } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            livestock_listings (user_id)
          )
        `)
        .eq('order_number', orderNumber)
        .single()

      if (fetchError) {
        return { success: false, error: 'Order not found' }
      }

      const hasPermission = order.order_items?.some((item: any) => 
        item.livestock_listings?.user_id === user.id
      )

      if (!hasPermission) {
        return { success: false, error: 'Unauthorized to update this order' }
      }

      const statusHierarchy: Record<string, number> = {
        'pending': 0,
        'confirmed': 1,
        'processing': 2,
        'packed': 3,
        'shipped': 4,
        'ready_for_pickup': 4,
        'in_transit': 5,
        'out_for_delivery': 6,
        'delivered': 7,
        'picked_up': 7,
        'completed': 8,
        'cancelled': -1
      }

      const currentStatusLevel = statusHierarchy[order.status] || 0
      const newStatusLevel = statusHierarchy[newStatus] || 0

      if (newStatus !== 'cancelled' && newStatusLevel < currentStatusLevel) {
        console.warn(`⚠️ Preventing backwards status change from ${order.status} to ${newStatus}`)
        return { 
          success: false, 
          error: `Cannot change status from ${order.status} to ${newStatus}` 
        }
      }

      // ✅ CRITICAL: Deduct quantity when confirming order (pending -> confirmed)
      if (order.status === 'pending' && newStatus === 'confirmed') {
        console.log('🎯 Order being confirmed - deducting quantities from listings...')
        
        for (const item of order.order_items || []) {
          const deductResult = await this.deductListingQuantity(
            item.listing_id,
            item.quantity
          )

          if (!deductResult.success) {
            console.error('❌ Failed to deduct quantity:', deductResult.error)
            return { 
              success: false, 
              error: `Cannot confirm order: ${deductResult.error}` 
            }
          }

          console.log(`✅ Deducted ${item.quantity} from listing ${item.listing_id}`)
        }
      }

      const updateData: any = { 
        status: newStatus,
        current_shipping_status: newStatus,
        updated_at: new Date().toISOString()
      }

      if (newStatus === 'shipped' && !order.estimated_delivery_date) {
        const estimatedDate = new Date()
        estimatedDate.setDate(estimatedDate.getDate() + 3)
        updateData.estimated_delivery_date = estimatedDate.toISOString().split('T')[0]
      }

      if (newStatus === 'completed') {
        updateData.actual_delivery_date = new Date().toISOString().split('T')[0]
      }

      const { error: updateError } = await supabase
        .from('orders')
        .update(updateData)
        .eq('order_number', orderNumber)

      if (updateError) {
        console.error('❌ Error updating order:', updateError)
        return { success: false, error: updateError.message }
      }

      const shippingMessage = this.getShippingStatusMessage(newStatus)
      await this.addShippingUpdate(orderNumber, newStatus, shippingMessage)

      console.log('✅ Order status updated successfully')
      return { success: true, message: 'Order status updated successfully' }
    } catch (error: any) {
      console.error('💥 Error in updateOrderStatus:', error)
      return { success: false, error: error.message || 'Failed to update order status' }
    }
  }

  async markAsShipped(
    orderNumber: string,
    estimatedDeliveryDays: number = 3
  ): Promise<ApiResponse<void>> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        return { success: false, error: 'Not authenticated' }
      }

      console.log('📦 Marking order as shipped:', orderNumber)

      const { data: order, error: fetchError } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            livestock_listings (user_id)
          )
        `)
        .eq('order_number', orderNumber)
        .single()

      if (fetchError) {
        console.error('❌ Fetch error:', fetchError)
        return { success: false, error: 'Order not found' }
      }

      const hasPermission = order.order_items?.some((item: any) => 
        item.livestock_listings?.user_id === user.id
      )

      if (!hasPermission) {
        return { success: false, error: 'Unauthorized to update this order' }
      }

      if (order.delivery_method !== 'delivery') {
        return { success: false, error: 'This order is for pickup, not delivery' }
      }

      const estimatedDate = new Date()
      estimatedDate.setDate(estimatedDate.getDate() + estimatedDeliveryDays)

      const { error: updateError } = await supabase
        .from('orders')
        .update({ 
          status: 'shipped',
          current_shipping_status: 'shipped',
          estimated_delivery_date: estimatedDate.toISOString().split('T')[0],
          updated_at: new Date().toISOString()
        })
        .eq('order_number', orderNumber)

      if (updateError) {
        console.error('❌ Error marking as shipped:', updateError)
        return { success: false, error: updateError.message }
      }

      await this.addShippingUpdate(
        orderNumber, 
        'shipped', 
        `Order has been shipped. Estimated delivery in ${estimatedDeliveryDays} days.`
      )

      console.log('✅ Order marked as shipped')
      return { success: true, message: 'Order marked as shipped successfully' }
    } catch (error: any) {
      console.error('💥 Error in markAsShipped:', error)
      return { success: false, error: error.message || 'Failed to mark order as shipped' }
    }
  }

  async markReadyForPickup(orderNumber: string): Promise<ApiResponse<void>> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        console.error('❌ Not authenticated')
        return { success: false, error: 'Not authenticated' }
      }

      console.log('📦 Calling RPC: mark_order_ready_for_pickup')
      console.log('   Order:', orderNumber)
      console.log('   User:', user.id)

      const { data, error } = await supabase.rpc('mark_order_ready_for_pickup', {
        p_order_number: orderNumber,
        p_user_id: user.id
      })

      console.log('📦 RPC Response:', { data, error })

      if (error) {
        console.error('❌ RPC Error:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        })
        
        if (error.message?.includes('function') && error.message?.includes('does not exist')) {
          return { 
            success: false, 
            error: 'Database function not found. Please run COMPREHENSIVE_FIX.sql in Supabase SQL Editor first.' 
          }
        }
        
        return { success: false, error: error.message }
      }

      if (data && typeof data === 'object') {
        if (data.success) {
          console.log('✅ Success:', data.message)
          return { success: true, message: data.message }
        } else {
          console.error('❌ Function returned error:', data.error)
          return { success: false, error: data.error }
        }
      }

      console.log('✅ Order marked as ready for pickup')
      return { success: true, message: 'Order marked as ready for pickup successfully' }
      
    } catch (error: any) {
      console.error('💥 Critical error in markReadyForPickup:', error)
      return { 
        success: false, 
        error: error.message || 'Failed to mark order as ready for pickup' 
      }
    }
  }

  async confirmPickup(orderNumber: string): Promise<ApiResponse<void>> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        console.error('❌ Not authenticated')
        return { success: false, error: 'Not authenticated' }
      }

      console.log('✅ Calling RPC: confirm_order_pickup')
      console.log('   Order:', orderNumber)
      console.log('   User:', user.id)

      const { data, error } = await supabase.rpc('confirm_order_pickup', {
        p_order_number: orderNumber,
        p_user_id: user.id
      })

      console.log('✅ RPC Response:', { data, error })

      if (error) {
        console.error('❌ RPC Error:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        })
        
        if (error.message?.includes('function') && error.message?.includes('does not exist')) {
          return { 
            success: false, 
            error: 'Database function not found. Please run COMPREHENSIVE_FIX.sql in Supabase SQL Editor first.' 
          }
        }
        
        return { success: false, error: error.message }
      }

      if (data && typeof data === 'object') {
        if (data.success) {
          console.log('✅ Success:', data.message)
          return { success: true, message: data.message }
        } else {
          console.error('❌ Function returned error:', data.error)
          return { success: false, error: data.error }
        }
      }

      console.log('✅ Pickup confirmed')
      return { success: true, message: 'Pickup confirmed successfully' }
      
    } catch (error: any) {
      console.error('💥 Critical error in confirmPickup:', error)
      return { 
        success: false, 
        error: error.message || 'Failed to confirm pickup' 
      }
    }
  }

  /**
   * ✅ UPDATED: Now restores quantity when order is cancelled
   */
  async cancelOrder(orderNumber: string): Promise<ApiResponse<void>> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        return { success: false, error: 'Not authenticated' }
      }

      console.log('❌ Cancelling order:', orderNumber)

      const { data: order, error: fetchError } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            listing_id,
            quantity
          )
        `)
        .eq('order_number', orderNumber)
        .eq('user_id', user.id)
        .single()

      if (fetchError) {
        return { success: false, error: 'Order not found' }
      }

      if (order.status !== 'pending' && order.status !== 'confirmed') {
        return { success: false, error: 'Order cannot be cancelled at this stage' }
      }

      // ✅ CRITICAL: Restore quantity if order was confirmed
      if (order.status === 'confirmed') {
        console.log('🔄 Order was confirmed - restoring quantities to listings...')
        
        for (const item of order.order_items || []) {
          const restoreResult = await this.restoreListingQuantity(
            item.listing_id,
            item.quantity
          )

          if (!restoreResult.success) {
            console.warn('⚠️ Failed to restore quantity:', restoreResult.error)
            // Continue anyway - cancellation is more important
          } else {
            console.log(`✅ Restored ${item.quantity} to listing ${item.listing_id}`)
          }
        }
      }

      const { error: updateError } = await supabase
        .from('orders')
        .update({ 
          status: 'cancelled',
          current_shipping_status: 'cancelled',
          updated_at: new Date().toISOString()
        })
        .eq('order_number', orderNumber)

      if (updateError) {
        console.error('❌ Error cancelling order:', updateError)
        return { success: false, error: updateError.message }
      }

      await this.addShippingUpdate(orderNumber, 'cancelled', 'Order cancelled by buyer')

      console.log('✅ Order cancelled successfully')
      return { success: true, message: 'Order cancelled successfully' }
    } catch (error: any) {
      console.error('💥 Error in cancelOrder:', error)
      return { success: false, error: error.message || 'Failed to cancel order' }
    }
  }

  async confirmDelivery(orderNumber: string): Promise<ApiResponse<void>> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        return { success: false, error: 'Not authenticated' }
      }

      console.log('✅ Confirming delivery for order:', orderNumber)

      const { error: updateError } = await supabase
        .from('orders')
        .update({ 
          status: 'completed',
          current_shipping_status: 'delivered',
          actual_delivery_date: new Date().toISOString().split('T')[0],
          updated_at: new Date().toISOString()
        })
        .eq('order_number', orderNumber)
        .eq('user_id', user.id)

      if (updateError) {
        console.error('❌ Error confirming delivery:', updateError)
        return { success: false, error: updateError.message }
      }

      await this.addShippingUpdate(orderNumber, 'delivered', 'Order delivered and confirmed by buyer')

      console.log('✅ Delivery confirmed successfully')
      return { success: true, message: 'Delivery confirmed successfully' }
    } catch (error: any) {
      console.error('💥 Error in confirmDelivery:', error)
      return { success: false, error: error.message || 'Failed to confirm delivery' }
    }
  }
}

export const transactionService = new TransactionService()