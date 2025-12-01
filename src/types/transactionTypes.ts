// types/transactionTypes.ts - FIXED TYPE DEFINITIONS WITH PROPER UNION TYPE HANDLING

export interface Farmer {
  id: string // UUID from Supabase auth
  name: string
  farmName?: string
  contact: string
  email?: string
  address: string
  avatar: string
}

export interface Animal {
  id: number // Numeric ID for internal use
  uuid: string // Primary listing UUID - this is the main identifier
  title: string
  type: string
  breed: string
  weight: number
  weightUnit?: string
  quantity: number
  originalQuantity?: number
  age: string
  gender: string
  status: string
  healthStatus?: string[]
  price: number
  priceUnit?: string
  deliveryOptions: string[]
  paymentMethods?: string[]
  images: string[]
  description: string
  datePosted: string
  farmer: Farmer
  location: string
  isAuction?: boolean
  startingBid?: number
  currentBid?: number
  bidCount?: number
  endTime?: string
  duration?: string
  auctionStartTime?: string
  reservePrice?: number
  bidIncrement?: number
  paymentTerms?: string
  additionalTerms?: string
}

export interface Buyer {
  id: string // UUID from Supabase auth
  name: string
  contact: string
  email?: string
  address: string
  avatar?: string
  farm?: string | null
}

export interface DeliveryAddress {
  label: string
  contactPerson: string
  phone: string
  street: string
  city: string
  province: string
  postalCode: string
}

export interface PickupSchedule {
  availableDays: string[]
  startTime: string
  endTime: string
}

// Shipping tracking information
export interface ShippingUpdate {
  status: 'confirmed' | 'processing' | 'packed' | 'shipped' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'ready_for_pickup'
  message: string
  location?: string
  timestamp: string
}

export interface FarmerTransaction {
  id: string
  animal: Animal
  buyer: Buyer
  date: string
  status: 'Pending' | 'Accepted' | 'Rejected' | 'Completed'
  amount: number
  paymentMethod: string
  deliveryMethod: string
  message?: string
  hasReceipt?: boolean
  deliveryAddress?: DeliveryAddress
  deliveryDate?: string
  deliveryTime?: string
  deliveryNotes?: string
  pickupSchedule?: PickupSchedule
  shippingFee?: number
  quantity: number
  // Shipping tracking
  shippingUpdates?: ShippingUpdate[]
  currentShippingStatus?: string
  estimatedDeliveryDate?: string
  actualDeliveryDate?: string
  // Conversation integration
  conversationId?: string
}

export interface BuyerTransaction {
  id: string
  animal: Animal
  farmer: Farmer
  date: string
  status: 'Pending' | 'Accepted' | 'Shipped' | 'Completed' | 'Cancelled'
  amount: number
  paymentMethod: string
  deliveryMethod: string
  estimatedDelivery?: string
  trackingNumber?: string
  message?: string
  hasReceipt?: boolean
  deliveryAddress?: DeliveryAddress
  deliveryDate?: string
  deliveryTime?: string
  deliveryNotes?: string
  pickupSchedule?: PickupSchedule
  shippingFee?: number
  quantity: number
  // Shipping tracking
  shippingUpdates?: ShippingUpdate[]
  currentShippingStatus?: string
  estimatedDeliveryDate?: string
  actualDeliveryDate?: string
  // Conversation integration
  conversationId?: string
}

export type Transaction = FarmerTransaction | BuyerTransaction

export interface TransactionFilters {
  search: string
  statuses: string[]
  types: string[]
  farmers: string[]
  dateFrom: string
  dateTo: string
}

export interface ReceiptForm {
  receiptNumber: string
  issueDate: string
  paymentStatus: 'Paid' | 'Partially Paid' | 'Pending'
  farmerName: string
  farmerAddress: string
  farmerContact: string
  farmerEmail: string
  farmerTIN: string
  buyerName: string
  buyerAddress: string
  buyerContact: string
  buyerEmail: string
  notes: string
}

// ==================== SALES PERFORMANCE TYPES ====================

export interface CategoryStat {
  name: string
  revenue: number
  count: number
  percentage: number
}

export interface StatusStat {
  name: string
  count: number
  percentage: number
  color: string
}

export interface PaymentMethodStat {
  name: string
  count: number
  percentage: number
}

export interface DeliveryMethodStat {
  name: string
  count: number
  percentage: number
}

export interface PerformanceStats {
  totalRevenue: number
  totalOrders: number
  completedOrders: number
  avgOrderValue: number
  totalItems: number
  revenueChange: number
  topCategory?: {
    name: string
    revenue: number
  }
}

export interface RecentActivity {
  id: string
  title: string
  description: string
  amount: number
  date: string
}

export interface TopTransaction {
  id: string
  animal: {
    type: string
    breed: string
  }
  quantity: number
  amount: number
  date: string
  status: string
}

// ==================== CHAT/MESSAGE INTEGRATION ====================

/**
 * ✅ FIXED: Use intersection type instead of extending union type
 * Helper type to check if transaction has an associated conversation
 */
export type TransactionWithChat = Transaction & {
  conversationId: string
  hasUnreadMessages?: boolean
  lastMessageAt?: string
}

/**
 * Alternative: Separate interfaces for each transaction type with chat
 */
export interface FarmerTransactionWithChat extends FarmerTransaction {
  conversationId: string
  hasUnreadMessages?: boolean
  lastMessageAt?: string
}

export interface BuyerTransactionWithChat extends BuyerTransaction {
  conversationId: string
  hasUnreadMessages?: boolean
  lastMessageAt?: string
}

// ==================== HELPER FUNCTIONS ====================

/**
 * Get the listing UUID from an Animal object
 * This is the primary identifier for listings
 */
export function getListingId(animal: Animal): string {
  return animal.uuid
}

/**
 * Type guard to check if a transaction is a FarmerTransaction
 */
export function isFarmerTransaction(transaction: Transaction): transaction is FarmerTransaction {
  return 'buyer' in transaction
}

/**
 * Type guard to check if a transaction is a BuyerTransaction
 */
export function isBuyerTransaction(transaction: Transaction): transaction is BuyerTransaction {
  return 'farmer' in transaction
}

/**
 * ✅ NEW: Type guard to check if a transaction has chat info
 */
export function isTransactionWithChat(transaction: Transaction): transaction is TransactionWithChat {
  return 'conversationId' in transaction && transaction.conversationId !== undefined
}

/**
 * ✅ NEW: Type guard for FarmerTransactionWithChat
 */
export function isFarmerTransactionWithChat(transaction: Transaction): transaction is FarmerTransactionWithChat {
  return isFarmerTransaction(transaction) && isTransactionWithChat(transaction)
}

/**
 * ✅ NEW: Type guard for BuyerTransactionWithChat
 */
export function isBuyerTransactionWithChat(transaction: Transaction): transaction is BuyerTransactionWithChat {
  return isBuyerTransaction(transaction) && isTransactionWithChat(transaction)
}

/**
 * Get the other party's information from a transaction
 */
export function getOtherParty(transaction: Transaction): { id: string; name: string; avatar: string; farmName?: string } {
  if (isFarmerTransaction(transaction)) {
    return {
      id: transaction.buyer.id,
      name: transaction.buyer.name,
      avatar: transaction.buyer.avatar || 'https://via.placeholder.com/40',
      farmName: transaction.buyer.farm || undefined
    }
  } else {
    return {
      id: transaction.farmer.id,
      name: transaction.farmer.name,
      avatar: transaction.farmer.avatar,
      farmName: transaction.farmer.farmName
    }
  }
}

/**
 * ✅ NEW: Helper to safely get conversationId from a transaction
 */
export function getConversationId(transaction: Transaction): string | undefined {
  return transaction.conversationId
}

/**
 * ✅ NEW: Helper to check if transaction has an active conversation
 */
export function hasActiveConversation(transaction: Transaction): boolean {
  return isTransactionWithChat(transaction)
}