export interface Animal {
  id: number;
  type: string;
  breed: string;
  weight: number;
  quantity: number;
  age: string;
  gender: string;
  status: string;
  price: number;
  deliveryOptions: string[];
  images: string[];
  description: string;
  datePosted: string;
  farmer: Farmer;
  location: string;
}


export interface Farmer {
  id: number;
  name: string;
  farmName?: string;
  contact: string;
  address: string;
  avatar: string;
}