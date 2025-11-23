// marketplace.ts 

export interface Animal {
  id: string;
  title: string;
  type: string;
  breed: string;
  weight: number;
  quantity: number;
  originalQuantity: number;
  age: string;
  gender: string;
  status: string;
  healthStatus: string[];
  price: number;
  deliveryOptions: string[];
  images: string[];
  description: string;
  datePosted: string;
  farmer: {
    id: string;
    name: string;
    farmName: string;
    contact: string;
    email: string;
    address: string;
    avatar: string;
  };
  location: string;
  isAuction: boolean;
  startingBid?: number;
  currentBid?: number;
  bidCount?: number;
  endTime?: string;
  auctionStartTime?: string;
}

export interface Filters {
  search: string;
  types: string[];
  breeds: string[];
  locations: string[];
  priceRanges: string[];
  genders: string[];
  healthStatuses: string[];
  auctionStatuses: string[];
  endTimeRanges: string[];
  bidCountMin: number | null;
  bidCountMax: number | null;
  startingBidRanges: string[];
  auctionDurations: string[];
  bidActivities: string[];
}

export interface BidData {
  animalId: string;
  amount: number;
}

export interface MessageData {
  message: string;
  contactMethod: string;
}

export interface CurrentUser {
  name: string;
  email: string;
  role: string;
}

// Additional types for FilterSidebar
export interface PriceRange {
  label: string;
  value: string;
}

export interface TimeRange {
  label: string;
  value: string;
}

export interface AuctionDuration {
  label: string;
  value: string;
}