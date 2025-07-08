export interface User {
  email: string
  password: string
  role: 'Farmer' | 'Buyer'
}

export const users: User[] = [
  { email: 'farmer@gmail.com', password: '123', role: 'Farmer' },
  { email: 'buyer@gmail.com', password: '123', role: 'Buyer' }
]

export function getCurrentUser(): User | null {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}
