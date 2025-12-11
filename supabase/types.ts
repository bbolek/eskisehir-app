// Auto-generated Supabase types for Eskişehir App

export type MediaType = 'image' | 'video';
export type EntityType = 'place' | 'culture' | 'food';
export type CategoryType = 'place' | 'culture' | 'food';

export interface Media {
  id: string;
  type: MediaType;
  url: string;
  thumbnail: string | null;
  caption: string | null;
  entity_type: EntityType;
  entity_id: string;
  is_main: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface MediaItem {
  id: string;
  type: MediaType;
  url: string;
  thumbnail: string | null;
  caption: string | null;
}

export interface Category {
  id: string;
  name: string;
  type: CategoryType;
  created_at: string;
  updated_at: string;
}

export interface Place {
  id: string;
  name: string;
  short_info: string | null;
  main_text: string | null;
  category: string;
  latitude: number | null;
  longitude: number | null;
  address: string | null;
  created_at: string;
  updated_at: string;
}

export interface PlaceWithMedia extends Place {
  main_media: MediaItem | null;
  gallery: MediaItem[] | null;
}

export interface Culture {
  id: string;
  title: string;
  short_info: string | null;
  main_text: string | null;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface CultureWithMedia extends Culture {
  main_media: MediaItem | null;
  gallery: MediaItem[] | null;
}

export interface Food {
  id: string;
  name: string;
  short_info: string | null;
  main_text: string | null;
  category: string;
  ingredients: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface FoodWithMedia extends Food {
  main_media: MediaItem | null;
  gallery: MediaItem[] | null;
}

// Database schema types for Supabase client
export interface Database {
  public: {
    Tables: {
      categories: {
        Row: Category;
        Insert: Omit<Category, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Category, 'id' | 'created_at' | 'updated_at'>>;
      };
      places: {
        Row: Place;
        Insert: Omit<Place, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Place, 'id' | 'created_at' | 'updated_at'>>;
      };
      culture: {
        Row: Culture;
        Insert: Omit<Culture, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Culture, 'id' | 'created_at' | 'updated_at'>>;
      };
      food: {
        Row: Food;
        Insert: Omit<Food, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Food, 'id' | 'created_at' | 'updated_at'>>;
      };
      media: {
        Row: Media;
        Insert: Omit<Media, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Media, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
    Views: {
      places_with_media: {
        Row: PlaceWithMedia;
      };
      culture_with_media: {
        Row: CultureWithMedia;
      };
      food_with_media: {
        Row: FoodWithMedia;
      };
    };
  };
}
