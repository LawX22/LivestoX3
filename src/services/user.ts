// user.ts

// Verification Status
export type VerificationStatus = 'verified' | 'pending' | 'rejected' | 'unverified'

// ADDRESS TYPES
export interface Address {
  fullName?: string
  label?: string
  phoneNumber?: string
  street?: string
  barangay?: string
  city?: string
  province?: string
  region?: string
  zipCode?: string
  description?: string
  isDefault?: boolean
}

// FARM INFO TYPES
export interface FarmAddress {
  street?: string
  barangay?: string
  city?: string
  province?: string
  region?: string
  zipCode?: string
}

export interface FarmInfo {
  farmName?: string
  farmSize?: string
  farmSizeUnit?: string
  livestockTypes?: string[]
  description?: string
  farmAddress?: FarmAddress
}

// VERIFICATION TYPES
export interface VerificationInfo {
  status?: VerificationStatus
  approvedAt?: string
  rejectedAt?: string
  reason?: string
}

export interface VerificationRequest {
  userId: string
  idType: string
  frontImage: string
  backImage: string
  status: VerificationStatus
  submittedAt: string
  rejectionReason?: string
}

export interface VerificationData {
  idType: string
  frontImage: string
  backImage: string
}

// USER DATA TYPES
export interface UserData {
  role?: string
  department?: string
}

// USER TYPES
export interface User {
  userId: string
  publicId?: string
  username: string
  email: string
  password?: string
  firstName: string
  lastName: string
  phoneNumber: string
  gender: 'Male' | 'Female' | 'Other' | string
  role: 'Buyer' | 'Farmer' | 'Admin' | 'Banned' | string
  isVerified: boolean
  createdAt: string | Date
  lastActive?: string | Date
  profilePicture?: string

  // Farm info
  farmName?: string
  farmLocation?: string
  farmSize?: string
  farmSizeUnit?: string
  livestockTypes?: string[]
  livestockType?: string
  experience?: string
  description?: string
  farmAddress?: Address

  // Verification info
  verificationStatus?: VerificationStatus
  verification?: VerificationInfo

  // Admin
  bannedUntil?: string
  isBanned?: boolean
  isOnline?: boolean

  // Addresses
  addresses?: Address[]
}
