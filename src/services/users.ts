// src/types/user.ts

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
  email: string
  password?: string
  role: 'Buyer' | 'Farmer' | 'Admin' | 'Banned'
  username?: string
  firstName?: string
  lastName?: string
  phoneNumber?: string
  gender?: 'Male' | 'Female' | 'Other'
  createdAt?: string
  farmName?: string
  farmLocation?: string
  farmSize?: string
  livestockType?: string
  experience?: string
  description?: string
  bannedUntil?: string
}


export const users: User[] = [
  {
    email: 'farmer@gmail.com',
    password: '123',
    role: 'Farmer',
    username: 'juandc',
    firstName: 'Juan',
    lastName: 'Dela Cruz',
    phoneNumber: '09171234567',
    gender: 'Male',
    createdAt: '2024-01-01T08:00:00.000Z'
  },
  {
    email: 'buyer@gmail.com',
    password: '123',
    role: 'Buyer',
    username: 'maria88',
    firstName: 'Maria',
    lastName: 'Reyes',
    phoneNumber: '09181234567',
    gender: 'Female',
    createdAt: '2024-01-02T08:00:00.000Z'
  },
  {
    email: 'admin@gmail.com',
    password: '123',
    role: 'Admin',
    username: 'adminuser',
    firstName: 'Admin',
    lastName: 'User',
    phoneNumber: '09991234567',
    gender: 'Other',
    createdAt: '2024-01-03T08:00:00.000Z'
  }
]

export function getFullName(user: User): string {
  return `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || 'No Name Provided'
}

export function getCurrentUser(): User | null {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}
