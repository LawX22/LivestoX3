// src/services/animalData.ts

export interface Animal {
  id: number
  name: string
  breed: string
  age: number
  price: number
  image: string
  ownerEmail?: string
}

export const defaultAnimal: Animal = {
  id: 0,
  name: '',
  breed: '',
  age: 0,
  price: 0,
  image: '',
  ownerEmail: ''
}

export const animalList: Animal[] = [
  {
    id: 1,
    name: 'Bull',
    breed: 'Brahman',
    age: 3,
    price: 30000,
    image: '/src/assets/Bull.jpg'
  },
  {
    id: 2,
    name: 'Cow',
    breed: 'Holstein',
    age: 2,
    price: 25000,
    image: '/src/assets/cow.jpg'
  },
  {
    id: 3,
    name: 'Calf',
    breed: 'Jersey',
    age: 1,
    price: 15000,
    image: '/src/assets/cow.jpg'
  }
]

export const initialAnimals: Animal[] = [...animalList]
