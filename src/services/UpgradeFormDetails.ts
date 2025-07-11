export const livestockTypes = [
  'Cattle',
  'Goats',
  'Pigs',
  'Sheep',
  'Chickens',
  'Ducks',
  'Carabaos',
  'Turkeys',
  'Rabbits',
  'Others'
]

export interface UpgradeFormData {
  fullName: string
  phone: string
  farmName: string

  // Farm Address Breakdown
  region: string
  province: string
  city: string
  barangay: string
  street: string

  farmSize: string
  livestockType: string
  experience: string
  description: string

  // Optional metadata
  email?: string
  date?: string
}
