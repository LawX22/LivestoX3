// src/types/animalTypes.ts
// Comprehensive type definitions for the Livestock Marketplace Application

/**
 * Farmer information interface
 */
export interface Farmer {
  id: string;
  name: string;
  farmName: string;
  contact: string;
  email: string;
  address: string;
  avatar: string;
}

/**
 * Main Animal/Livestock listing interface
 */
export interface Animal {
  id: string;
  uuid?: string;
  title: string;
  type: string;
  breed: string;
  weight: number;
  weightUnit?: string;
  quantity: number;
  originalQuantity?: number;
  age: string;
  gender: string;
  status: string;
  healthStatus: string[];
  price: number;
  priceUnit?: string;
  deliveryOptions: string[];
  paymentMethods?: string[];
  images: string[];
  description: string;
  datePosted: string;
  farmer: Farmer;
  location: string;
  isAuction: boolean;
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

/**
 * Filter options interface
 */
export interface Filters {
  search: string;
  types: string[];
  breeds: string[];
  locations: string[];
  priceRanges: string[];
  genders: string[];
  healthStatuses: string[];
  auctionStatuses: string[];
  endTimeRanges: string[];
  bidCountMin: number | null;
  bidCountMax: number | null;
  startingBidRanges: string[];
  auctionDurations: string[];
  bidActivities: string[];
}

/**
 * Bid data for placing bids on auctions
 */
export interface BidData {
  animalId: string;
  amount: number;
  userId?: string;
  timestamp?: string;
}

/**
 * Message data for contacting farmers
 */
export interface MessageData {
  message: string;
  contactMethod: string;
  recipientId?: string;
  senderId?: string;
}

/**
 * Current user information
 */
export interface CurrentUser {
  name: string;
  email: string;
  role: 'buyer' | 'farmer';
  id?: string;
  phone?: string;
  address?: string;
  avatar?: string;
}

/**
 * User details (extended)
 */
export interface UserDetails {
  id: string;
  fullName: string;
  email: string;
  role: 'buyer' | 'farmer';
  phone?: string;
  address?: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
}

/**
 * Price range option
 */
export interface PriceRange {
  label: string;
  value: string;
  min: number;
  max?: number;
}

/**
 * Time range option for auctions
 */
export interface TimeRange {
  label: string;
  value: string;
  hours?: number;
}

/**
 * Auction duration option
 */
export interface AuctionDuration {
  label: string;
  value: string;
  days?: number;
}

/**
 * Bid activity category
 */
export interface BidActivity {
  label: string;
  value: string;
  min?: number;
  max?: number;
}

/**
 * Form data for creating/editing listings
 */
export interface CreateListingForm {
  title: string;
  description: string;
  type: string;
  breed: string;
  weight: number;
  weightUnit?: string;
  quantity: number;
  age: string;
  gender: string;
  status: string;
  healthStatus: string[];
  price: number;
  priceUnit?: string;
  location: string;
  deliveryOptions: string[];
  paymentMethods?: string[];
  images: string[];
}

/**
 * Auction form data (extends CreateListingForm)
 */
export interface CreateAuctionForm extends CreateListingForm {
  startingBid: number;
  reservePrice?: number;
  bidIncrement?: number;
  duration: string;
  auctionStartTime: string;
  paymentTerms?: string;
  additionalTerms?: string;
}

/**
 * Quantity update data
 */
export interface QuantityUpdateData {
  animalId: string;
  newQuantity: number;
  operation: 'increase' | 'decrease' | 'set';
}

/**
 * API Response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Navigation tab types
 */
export type TabType = 'normal' | 'auction';

/**
 * User role types
 */
export type UserRole = 'buyer' | 'farmer';

/**
 * Listing status types
 */
export type ListingStatus = 'Available' | 'Low Stock' | 'Out of Stock' | 'Sold';

/**
 * Auction status types
 */
export type AuctionStatus = 'Live' | 'Ending Soon' | 'Ended' | 'Hot Auction' | 'New Listing';

/**
 * Gender types
 */
export type Gender = 'Male' | 'Female' | 'Mixed';

/**
 * Health status types
 */
export type HealthStatus = 
  | 'Vaccinated' 
  | 'Dewormed' 
  | 'Healthy' 
  | 'Certified' 
  | 'Quarantine Cleared';

/**
 * Delivery option types
 */
export type DeliveryOption = 
  | 'Farm Pickup' 
  | 'Delivery Available' 
  | 'Meet Halfway' 
  | 'Livestock Transport';

/**
 * Payment method types
 */
export type PaymentMethod = 
  | 'Cash' 
  | 'Bank Transfer' 
  | 'GCash' 
  | 'PayMaya' 
  | 'Check' 
  | 'Installment';

/**
 * Sort options
 */
export type SortOption = 
  | 'datePosted' 
  | 'datePosted-asc' 
  | 'price' 
  | 'price-desc' 
  | 'endTime' 
  | 'bids' 
  | 'bidActivity' 
  | 'type' 
  | 'type-desc';

/**
 * Weight unit types
 */
export type WeightUnit = 'kg' | 'lbs';

/**
 * Price unit types
 */
export type PriceUnit = 'per head' | 'per kg' | 'total';

/**
 * Farm information interface
 */
export interface FarmInfo {
  farmName: string;
  registrationNumber?: string;
  farmSize?: string;
  farmType?: string;
  yearsInOperation?: number;
  certifications?: string[];
  street?: string;
  barangay?: string;
  city?: string;
  province?: string;
  region?: string;
}

/**
 * Notification interface
 */
export interface Notification {
  id: string;
  userId: string;
  type: 'bid' | 'message' | 'listing' | 'auction' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

/**
 * Message thread interface
 */
export interface MessageThread {
  id: string;
  participants: string[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  listingId?: string;
  listingTitle?: string;
}

/**
 * Transaction interface
 */
export interface Transaction {
  id: string;
  buyerId: string;
  sellerId: string;
  listingId: string;
  amount: number;
  quantity: number;
  status: 'pending' | 'completed' | 'cancelled' | 'refunded';
  paymentMethod: string;
  createdAt: string;
  completedAt?: string;
}

/**
 * Review interface
 */
export interface Review {
  id: string;
  listingId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
  userName: string;
  userAvatar: string;
}

/**
 * Statistics interface
 */
export interface Statistics {
  totalListings: number;
  activeListings: number;
  soldListings: number;
  totalRevenue: number;
  averageRating: number;
  totalReviews: number;
}

/**
 * Upload progress interface
 */
export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
  fileName: string;
}

/**
 * Modal props interface
 */
export interface ModalProps {
  isOpen: boolean;
  animal?: Animal | null;
  currentUser?: CurrentUser | null;
}

/**
 * Toast notification interface
 */
export interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
}