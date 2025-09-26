// animal.ts
export interface Farmer {
  id: number;
  name: string;
  farmName?: string;
  contact: string;
  email?: string;
  address: string;
  avatar: string;
}

export interface Animal {
  id: number;
  title: string; 
  type: string;
  breed: string;
  weight: number;
  quantity: number;
  originalQuantity?: number; 
  age: string;
  gender: string;
  status: string;
  healthStatus?: string[];
  price: number;
  deliveryOptions: string[];
  images: string[];
  description: string;
  datePosted: string;
  farmer: Farmer;
  location: string;
  isAuction?: boolean;
  startingBid?: number;
  currentBid?: number;
  bidCount?: number;
  endTime?: string;
  duration?: string;
  auctionStartTime?: string;
  reservePrice?: number; 
  bidIncrement?: number; 
  paymentTerms?: string; 
  additionalTerms?: string; 
}

export interface Filters {
  search: string;
  types: string[];
  breeds: string[];
  locations: string[];
  priceRanges: string[];
  genders: string[];
  healthStatuses?: string[]; 
  auctionStatuses: string[];
  endTimeRanges: string[];
  bidCountMin: number | null;
  bidCountMax: number | null;
  startingBidRanges: string[];
  auctionDurations: string[];
  bidActivities: string[];
}

export interface ServiceUser {
  email?: string;
  name?: string;
  displayName?: string;
  role?: string;
  isVerified?: boolean;
  [key: string]: any;
}

export interface BidData {
  animalId: number;
  amount: number;
}

export interface MessageData {
  message: string;
  contactMethod: string;
}

export interface CartItem {
  id: number;
  animal: Animal;
  quantity: number;
  totalPrice: number;
  dateAdded: string;
}

export interface PriceRange {
  label: string;
  value: string;
}

export interface TimeRange {
  label: string;
  value: string;
}

export interface AuctionDuration {
  label: string;
  value: string;
}

export interface Bid {
  id: number;
  amount: number;
  timestamp: string;
  user: User;
  previousBid?: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

export interface MessageTemplate {
  id: string;
  title: string;
  preview: string;
  template: string;
}

// New interfaces for livestock management forms
export interface CreateListingForm {
  title: string;
  type: string;
  breed: string;
  weight: number;
  quantity: number;
  age: string;
  gender: string;
  status: string;
  healthStatus: string[];
  price: number;
  deliveryOptions: string[];
  images: string[];
  description: string;
  location: string;
}

export interface CreateAuctionForm {
  title: string;
  type: string;
  breed: string;
  weight: number;
  quantity: number;
  age: string;
  gender: string;
  healthStatus: string[];
  startingBid: number;
  reservePrice?: number;
  bidIncrement: number;
  duration: string;
  deliveryOptions: string[];
  images: string[];
  description: string;
  location: string;
  paymentTerms: string;
  additionalTerms?: string;
}

export interface QuantityUpdateData {
  animalId: string;
  newQuantity: number;
  operation: 'sold' | 'restocked' | 'updated';
}

export interface AuctionBidData {
  animalId: string;
  amount: number;
}