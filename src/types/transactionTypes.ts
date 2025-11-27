// transactionTypes.ts - Transaction Type Definitions

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
  farm?: string
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