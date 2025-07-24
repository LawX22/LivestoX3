// src/services/animalData.ts

export interface Animal {
  id: number
  name: string
  breed: string
  age: number
  price: number
  image: string
  classification: string
  quantity: number
  weight: number
  ownerEmail?: string
}

export const defaultAnimal: Animal = {
  id: 0,
  name: '',
  breed: '',
  age: 0,
  price: 0,
  image: '',
  classification: '',
  quantity: 0,
  weight: 0,
  ownerEmail: ''
}

export const animalList: Animal[] = [
  {
    id: 1,
    name: 'Bull',
    breed: 'Brahman',
    age: 3,
    price: 30000,
    image: '/src/assets/Bull.jpg',
    classification: 'Large Cattle',
    quantity: 3,
    weight: 800,
    ownerEmail: 'farmer1@example.com'
  },
  {
    id: 2,
    name: 'Cow',
    breed: 'Holstein',
    age: 2,
    price: 25000,
    image: '/src/assets/cow.jpg',
    classification: 'Dairy Cattle',
    quantity: 2,
    weight: 600,
    ownerEmail: 'farmer2@example.com'
  },
  {
    id: 3,
    name: 'Calf',
    breed: 'Jersey',
    age: 1,
    price: 15000,
    image: '/src/assets/cow.jpg',
    classification: 'Young Stock',
    quantity: 5,
    weight: 300,
    ownerEmail: 'farmer1@example.com'
  }
]

export const initialAnimals: Animal[] = [...animalList]
