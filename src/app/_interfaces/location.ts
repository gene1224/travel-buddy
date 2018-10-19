export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Place {
  location: Coordinates;
  name: string;
  address?: string;
  order?: number;
  phone: string;
  email: string;
  category: string;
}

export interface Itinerary {
  title: string;
  startDate: string;
  endDate: string;
  places: Place[];
}
