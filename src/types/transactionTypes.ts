// types/transactionTypes.ts - COMPLETE TYPE DEFINITIONS
export interface Farmer {
  id: number
  name: string
  farmName?: string
  contact: string
  email?: string
  address: string
  avatar: string
}

export interface Animal {
  id: number
  uuid: string
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
  id: number
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
  status: 'confirmed' | 'processing' | 'packed' | 'shipped' | 'in_transit' | 'out_for_delivery' | 'delivered'
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