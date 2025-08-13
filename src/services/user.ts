export interface Address {
  fullName: string
  label: string
  phoneNumber: string
  region: string
  province: string
  city: string
  barangay: string
  street: string
  description?: string
  isDefault?: boolean
}

export interface User {
  userId: string
  publicId: string
  email: string
  password: string
  role: 'Buyer' | 'Farmer' | 'Admin' | 'Banned'
  username: string
  firstName: string
  lastName: string
  phoneNumber: string
  gender: 'Male' | 'Female' | 'Other'
    createdAt?: string | Date
    lastActive?: string | Date
    verificationStatus?: 'unverified' | 'pending' | 'approved' | 'rejected'
    verification?: VerificationInfo
  profilePicture?: string
  farmName?: string
  farmLocation?: string
  farmSize?: string
  livestockType?: string
  experience?: string
  description?: string
  bannedUntil?: string
  isVerified?: boolean
  isBanned?: boolean
  addresses?: Address[]
}

interface VerificationInfo {
  status?: 'unverified' | 'pending' | 'approved' | 'rejected'
  approvedAt?: string
  rejectedAt?: string
  reason?: string
}

export interface VerificationData {
  idType: string
  frontImage: string
  backImage: string
}

export interface SignUpForm {
  userId?: string
  publicId?: string
  firstName: string
  lastName: string
  username: string
  email: string
  phoneNumber: string
  gender: string
  password: string
  confirmPassword: string
  verificationCode: string
  role?: string
  profilePicture?: string
  createdAt?: string
}

// Default sign-up form values
export const defaultSignUpForm: SignUpForm = {
  userId: '',
  publicId: '',
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  phoneNumber: '',
  gender: '',
  password: '',
  confirmPassword: '',
  verificationCode: '',
  createdAt: ''
}

// Default users
export const defaultUsers: User[] = [
  {
    userId: '100001',
    publicId: 'juan.delacruz.101',
    email: 'farmer@gmail.com',
    password: '123',
    role: 'Farmer',
    username: 'juandc',
    firstName: 'Juan',
    lastName: 'Dela Cruz',
    phoneNumber: '09171234567',
    gender: 'Male',
    createdAt: '2024-01-01T08:00:00.000Z',
    isVerified: true,
    isBanned: false
  },
  {
    userId: '100002',
    publicId: 'maria.reyes.456',
    email: 'buyer@gmail.com',
    password: '123',
    role: 'Buyer',
    username: 'maria88',
    firstName: 'Maria',
    lastName: 'Reyes',
    phoneNumber: '09181234567',
    gender: 'Female',
    createdAt: '2024-01-02T08:00:00.000Z',
    isVerified: true,
    isBanned: false
  },
  {
    userId: '100003',
    publicId: 'admin.user.789',
    email: 'admin@gmail.com',
    password: '123',
    role: 'Admin',
    username: 'adminuser',
    firstName: 'Admin',
    lastName: 'User',
    phoneNumber: '09991234567',
    gender: 'Other',
    createdAt: '2024-01-03T08:00:00.000Z',
    isVerified: true,
    isBanned: false
  }
]

// Utility: Get full name
export function getFullName(user: User): string {
  return `${user.firstName} ${user.lastName}`.trim() || 'No Name Provided'
}

// Utility: Get current logged-in user from localStorage
export function getCurrentUser(): User | null {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

// ✅ Seed default users into localStorage
export function seedDefaultUsers(): void {
  const existingUserIds: string[] = JSON.parse(localStorage.getItem('userIds') || '[]')
  const updatedUserIds = [...existingUserIds]

  for (const user of defaultUsers) {
    const key = `user_${user.userId}`

    // Only add if not already saved
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify(user))
    }

    // Add userId to userIds list if not present
    if (!updatedUserIds.includes(user.userId)) {
      updatedUserIds.push(user.userId)
    }
  }

  localStorage.setItem('userIds', JSON.stringify(updatedUserIds))
}
