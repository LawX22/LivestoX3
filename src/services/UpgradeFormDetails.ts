export const livestockTypes = [
  'Poultry (Chickens)',
  'Swine (Pigs)',
  'Cattle (Cows)',
  'Goats',
  'Sheep',
  'Ducks',
  'Turkeys',
  'Quails',
  'Rabbits',
  'Others'
] as const

export const farmSizeUnits = [
  'hectares',
  'acres',
  'square meters'
] as const

export interface UpgradeFormData {
  fullName: string
  phone: string
  farmName: string
  region: string
  province: string
  city: string
  barangay: string
  street: string
  farmSize: string
  farmSizeUnit: string
  livestockTypes: string[]
  description: string
}