// user.ts

// ADDRESS TYPES
export interface Address {
  id?: string
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

// USER DATA TYPES
export interface UserData {
  role?: string
  department?: string
}

// USER TYPES
export interface User {
  upgradePending: boolean
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
  bannerImage?: string

  // Farm info
  farmName?: string
  farmLocation?: string
  farmSize?: string
  farmSizeUnit?: string
  livestockTypes?: string[]
  livestockType?: string
  experience?: string
  description?: string
  farmAddress?: FarmAddress

  // Admin
  bannedUntil?: string
  isBanned?: boolean
  isOnline?: boolean

  // Addresses (now stored in separate table)
  addresses?: Address[]
}

// Database Profile Type (matches Supabase profiles table - without addresses)
export interface ProfileDB {
  id: string
  username?: string
  first_name?: string
  last_name?: string
  phone_number?: string
  gender?: string
  role?: string
  is_verified?: boolean
  profile_picture?: string
  banner_image?: string
  
  // Farm info
  farm_name?: string
  farm_size?: string
  farm_size_unit?: string
  livestock_types?: string[]
  description?: string
  farm_address?: FarmAddress
  
  // Timestamps
  created_at?: string
  updated_at?: string
  
  // Note: addresses removed as they're now in separate table
}

// Database Address Type (matches Supabase addresses table)
export interface AddressDB {
  id: string
  user_id: string
  full_name?: string
  label?: string
  phone_number?: string
  street?: string
  barangay?: string
  city?: string
  province?: string
  region?: string
  zip_code?: string
  description?: string
  is_default: boolean
  created_at: string
  updated_at: string
}

// ✅ EXPORTED - Helper function to convert DB profile to User (addresses handled separately)
export function dbProfileToUser(profile: ProfileDB, email: string): User {
return {
  userId: profile.id,
  username: profile.username || '',
  email: email,
  firstName: profile.first_name || '',
  lastName: profile.last_name || '',
  phoneNumber: profile.phone_number || '',
  gender: profile.gender || '',
  role: profile.role || 'Buyer',
  isVerified: profile.is_verified || false,
  profilePicture: profile.profile_picture,
  bannerImage: profile.banner_image,

  // Farm info
  farmName: profile.farm_name,
  farmSize: profile.farm_size,
  farmSizeUnit: profile.farm_size_unit,
  livestockTypes: profile.livestock_types,
  description: profile.description,
  farmAddress: profile.farm_address,

  // Note: addresses will be populated separately from addresses table
  addresses: [],

  createdAt: profile.created_at || new Date().toISOString(),
  upgradePending: false
}
}

// ✅ EXPORTED - Helper function to convert User to DB profile (excludes addresses)
export function userToDbProfile(user: Partial<User>): Partial<ProfileDB> {
  // Destructure to exclude addresses
  const { addresses, ...userWithoutAddresses } = user
  
  return {
    username: userWithoutAddresses.username,
    first_name: userWithoutAddresses.firstName,
    last_name: userWithoutAddresses.lastName,
    phone_number: userWithoutAddresses.phoneNumber,
    gender: userWithoutAddresses.gender,
    role: userWithoutAddresses.role,
    is_verified: userWithoutAddresses.isVerified,
    profile_picture: userWithoutAddresses.profilePicture,
    banner_image: userWithoutAddresses.bannerImage,
    
    // Farm info
    farm_name: userWithoutAddresses.farmName,
    farm_size: userWithoutAddresses.farmSize,
    farm_size_unit: userWithoutAddresses.farmSizeUnit,
    livestock_types: userWithoutAddresses.livestockTypes,
    description: userWithoutAddresses.description,
    farm_address: userWithoutAddresses.farmAddress,
    
    // Note: addresses not included as they're managed separately
  }
}