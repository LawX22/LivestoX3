// types/cart.ts

// Farmer/Livestock Owner Interface
export interface Farmer {
  id: number;
  name: string;
  farmName?: string;
  contact: string;
  address: string;
  avatar: string;
}

// Cart/Checkout Item Interface
export interface CartItem {
  id: number;
  type: string;
  breed: string;
  weight: number;
  quantity: number;
  maxQuantity: number;
  age: string;
  gender: string;
  status: string;
  price: number;
  deliveryOptions: string[];
  images: string[];
  description: string;
  dateAdded: string;
  farmer: Farmer;
  location: string;
}

// User Information Interface
export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

// Address Interface
export interface Address {
  name: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
}

// Pickup Location Interface
export interface PickupLocation {
  name: string;
  address: string;
  hours: string;
  distance: string;
}

// Delivery Method Interface
export interface DeliveryMethod {
  value: string;
  label: string;
  description: string;
  icon: string;
}

// Payment Method Interface
export interface PaymentMethod {
  value: string;
  label: string;
  disabled: boolean;
}

// Form Errors Interface
export interface FormErrors {
  address?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  termsAgreed?: string;
}

// Cart State Interface
export interface CartState {
  items: CartItem[];
  selectedItems: number[];
  isProcessingOrder: boolean;
  showToast: boolean;
  toastMessage: string;
}

// Checkout State Interface
export interface CheckoutState {
  items: CartItem[];
  userInfo: UserInfo;
  deliveryMethod: string;
  selectedAddressIndex: number;
  selectedPickupIndex: number;
  paymentMethod: string;
  discount: number;
  termsAgreed: boolean;
  isProcessingOrder: boolean;
  showSuccessModal: boolean;
  orderId: string;
  errors: FormErrors;
  showAddressForm: boolean;
  newAddress: Address;
}

// Constants Type
export interface AppConstants {
  phProvinces: string[];
  shippingCost: number;
  codFee: number;
}