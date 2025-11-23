export interface Media {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  caption?: string;
}

export interface Place {
  id: string;
  name: string;
  shortInfo: string;
  mainText: string;
  mainMedia: Media;
  gallery: Media[];
  category?: string;
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CultureItem {
  id: string;
  title: string;
  shortInfo: string;
  mainText: string;
  mainMedia: Media;
  gallery: Media[];
  category?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface FoodItem {
  id: string;
  name: string;
  shortInfo: string;
  mainText: string;
  mainMedia: Media;
  gallery: Media[];
  category?: 'yemek' | 'tatlı' | 'içecek' | 'restoran';
  ingredients?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
