// services/user.ts

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
  farmSize?: string | number
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
  createdAt: string | Date
  lastActive?: string | Date
  profilePicture?: string
  bannerImage?: string

  // Farm info
  farmName?: string
  farmLocation?: string
  farmSize?: string | number
  farmSizeUnit?: string
  livestockTypes?: string[] | string
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
  profile_picture?: string
  banner_image?: string
  
  // Timestamps
  created_at?: string
  updated_at?: string
  
  // Note: farm info now stored in separate farm_info table
  // Note: addresses stored in separate addresses table
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

// Database Farm Info Type (matches Supabase farm_info table)
export interface FarmInfoDB {
  id: string
  user_id: string
  farm_name?: string
  farm_size?: number
  farm_size_unit?: string
  livestock_types?: string[]
  description?: string
  street?: string
  barangay?: string
  city?: string
  province?: string
  region?: string
  created_at: string
  updated_at: string
}

// ✅ EXPORTED - Helper function to convert DB profile to User (addresses and farm info handled separately)
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
    profilePicture: profile.profile_picture,
    bannerImage: profile.banner_image,

    // Note: farm info will be populated separately from farm_info table
    // Note: addresses will be populated separately from addresses table
    addresses: [],

    createdAt: profile.created_at || new Date().toISOString(),
    upgradePending: false
  }
}

// ✅ EXPORTED - Helper function to convert User to DB profile (excludes addresses and farm info)
export function userToDbProfile(user: Partial<User>): Partial<ProfileDB> {
  // Destructure to exclude addresses and farm info
  const { 
    addresses, 
    farmName, 
    farmSize, 
    farmSizeUnit, 
    livestockTypes, 
    description, 
    farmAddress,
    ...userWithoutAddressesAndFarm 
  } = user
  
  return {
    username: userWithoutAddressesAndFarm.username,
    first_name: userWithoutAddressesAndFarm.firstName,
    last_name: userWithoutAddressesAndFarm.lastName,
    phone_number: userWithoutAddressesAndFarm.phoneNumber,
    gender: userWithoutAddressesAndFarm.gender,
    role: userWithoutAddressesAndFarm.role,
    profile_picture: userWithoutAddressesAndFarm.profilePicture,
    banner_image: userWithoutAddressesAndFarm.bannerImage,
    
    // Note: farm info not included as it's managed separately in farm_info table
    // Note: addresses not included as they're managed separately in addresses table
  }
}