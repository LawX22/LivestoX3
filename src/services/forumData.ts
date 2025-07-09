// src/services/forumData.ts

export type UserRole = 'Farmer' | 'Buyer' | 'Admin'

export interface ForumAnswer {
  text: string
  userEmail: string
  userRole: UserRole
}

export interface ForumQuestion {
  id: number
  text: string
  userEmail: string
  userRole: UserRole
  visibility: 'all' | 'farmers'
  category?: string
  urgency?: string
  createdAt: string
  answers: ForumAnswer[]
  tempAnswer?: string
}

export const forumQuestions: ForumQuestion[] = [
  {
    id: 1,
    text: 'What’s the best feed for pregnant cows?',
    userEmail: 'farmer@gmail.com',
    userRole: 'Farmer',
    visibility: 'all',
    category: 'Feeding',
    urgency: 'Medium',
    createdAt: '2025-07-07T10:30:00Z',
    answers: [
      {
        text: 'You should provide high-fiber feed with enough calcium.',
        userEmail: 'buyer@gmail.com',
        userRole: 'Buyer'
      }
    ]
  },
  {
    id: 2,
    text: 'How do you deal with cattle heat stress?',
    userEmail: 'farmer2@gmail.com',
    userRole: 'Farmer',
    visibility: 'farmers',
    category: 'Health',
    urgency: 'High',
    createdAt: '2025-07-08T15:45:00Z',
    answers: []
  },
  {
    id: 3,
    text: 'What are the common signs of cow pregnancy?',
    userEmail: 'farmer@gmail.com',
    userRole: 'Farmer',
    visibility: 'all',
    category: 'Breeding',
    urgency: 'Low',
    createdAt: '2025-07-09T09:00:00Z',
    answers: [
      {
        text: 'Enlarged udder and calm behavior are typical signs.',
        userEmail: 'buyer@gmail.com',
        userRole: 'Buyer'
      }
    ]
  }
]
