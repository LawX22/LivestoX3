export interface ForumAnswer {
  text: string
  userEmail: string
  userRole: 'Farmer' | 'Buyer'
}

export interface ForumQuestion {
  id: number
  text: string
  userEmail: string
  userRole: 'Farmer' | 'Buyer'
  visibility: 'all' | 'farmers'
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
    answers: []
  }
]
