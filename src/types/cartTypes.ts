// types/cartTypes.ts - Unified Types for Cart, Checkout, and Transactions

// Farmer/Livestock Owner Interface
export interface Farmer {
  id: number
  name: string
  farmName?: string
  contact: string
  email?: string
  address: string
  avatar: string
}

// Animal/Livestock Interface
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

// Cart Item Interface (extends Animal with cart-specific properties)
export interface CartItem extends Animal {
  maxQuantity: number
  dateAdded: string
}

// Buyer Interface
export interface Buyer {
  id: number
  name: string
  contact: string
  email?: string
  address: string
  avatar?: string
  farm?: string
}

// User Information Interface
export interface UserInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
}

// Address Interface
export interface AddressInfo {
  street: string
  city: string
  province: string
  postalCode: string
}

// User Profile Interface (combines user info and address)
export interface UserProfile {
  fullName: string
  phone: string
  address: AddressInfo
}

// Address with Name Interface (for address book)
export interface Address {
  name: string
  street: string
  city: string
  province: string
  postalCode: string
}

// Saved Address Interface (includes contact person and phone)
export interface SavedAddress {
  label: string
  contactPerson: string
  phone: string
  street: string
  city: string
  province: string
  postalCode: string
  isDefault: boolean
}

// Farmer Location Interface (for pickup)
export interface FarmerLocation {
  farmerId: number
  farmerName: string
  farmName: string
  address: string
  phone: string
  hours: string
  distance: string
}

// Pickup Location Interface
export interface PickupLocation {
  name: string
  address: string
  hours: string
  distance: string
}

// Delivery Method Interface
export interface DeliveryMethod {
  value: string
  label: string
  description: string
  icon: string
}

// Payment Method Interface
export interface PaymentMethod {
  value: string
  label: string
  description?: string
  disabled: boolean
}

// Form Errors Interface
export interface FormErrors {
  address?: string
  city?: string
  province?: string
  postalCode?: string
  termsAgreed?: string
  pickup?: string
  deliveryDate?: string
  deliveryTime?: string
}

// Cart State Interface
export interface CartState {
  items: CartItem[]
  selectedItems: number[]
  isProcessingOrder: boolean
  showToast: boolean
  toastMessage: string
}

// Checkout State Interface
export interface CheckoutState {
  items: CartItem[]
  userInfo: UserInfo
  deliveryMethod: string
  selectedAddressIndex: number
  selectedPickupIndex: number
  paymentMethod: string
  discount: number
  termsAgreed: boolean
  isProcessingOrder: boolean
  showSuccessModal: boolean
  orderId: string
  errors: FormErrors
  showAddressForm: boolean
  newAddress: Address
}

// Constants Type
export interface AppConstants {
  phProvinces: string[]
  shippingCost: number
  codFee: number
}