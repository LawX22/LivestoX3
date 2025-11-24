// transactions.ts

export interface Livestock {
  id: number
  type: string
  breed: string
  description: string
  image: string
}

export interface Person {
  id: number
  name: string
  contact: string
  avatar: string
}

export interface Buyer extends Person {
  address: string
}

export interface Seller extends Person {
  address: string
  farm: string
}

export interface FarmerTransaction {
  id: string
  livestock: Livestock
  buyer: Buyer
  date: string
  status: 'Pending' | 'Accepted' | 'Rejected' | 'Completed'
  amount: number
  paymentMethod: string
  deliveryMethod: string
  message?: string
}

export interface BuyerTransaction {
  id: string
  livestock: Livestock
  seller: Seller
  date: string
  status: 'Pending' | 'Accepted' | 'Shipped' | 'Completed' | 'Cancelled'
  amount: number
  paymentMethod: string
  deliveryMethod: string
  message?: string
  trackingNumber?: string
  estimatedDelivery?: string
}

export type Transaction = FarmerTransaction | BuyerTransaction

export interface Filters {
  search: string
  statuses: string[]
  types: string[]
  sellers: string[]
  dateFrom: string
  dateTo: string
}