import { CultureItem, FoodItem, Media, Place } from '@/types/place';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.EXPO_PUBLIC_ESK_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_ESK_SUPABASE_ANON_KEY;

// Check if Supabase is configured
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey &&
  supabaseUrl !== '' && supabaseAnonKey !== '' &&
  supabaseUrl.startsWith('https://');

// Create client only if configured, otherwise create a dummy that will fail gracefully
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Helper to check if Supabase is available
function ensureSupabase(): SupabaseClient {
  if (!supabase) {
    throw new Error('Supabase is not configured. Please add EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY to your .env file.');
  }
  return supabase;
}

// Types for database responses
interface DbMedia {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail: string | null;
  caption: string | null;
}

interface DbPlace {
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
  main_media: DbMedia | null;
  gallery: DbMedia[] | null;
}

interface DbCulture {
  id: string;
  title: string;
  short_info: string | null;
  main_text: string | null;
  category: string;
  created_at: string;
  updated_at: string;
  main_media: DbMedia | null;
  gallery: DbMedia[] | null;
}

interface DbFood {
  id: string;
  name: string;
  short_info: string | null;
  main_text: string | null;
  category: string;
  ingredients: string[] | null;
  created_at: string;
  updated_at: string;
  main_media: DbMedia | null;
  gallery: DbMedia[] | null;
}

// Transform database media to app media format
function transformMedia(dbMedia: DbMedia | null): Media {
  if (!dbMedia) {
    return {
      id: '',
      type: 'image',
      url: 'https://via.placeholder.com/800x600?text=No+Image',
    };
  }
  return {
    id: dbMedia.id,
    type: dbMedia.type,
    url: dbMedia.url,
    thumbnail: dbMedia.thumbnail || undefined,
    caption: dbMedia.caption || undefined,
  };
}

function transformGallery(gallery: DbMedia[] | null): Media[] {
  if (!gallery) return [];
  return gallery.map(transformMedia);
}

// Transform database place to app place format
function transformPlace(dbPlace: DbPlace): Place {
  return {
    id: dbPlace.id,
    name: dbPlace.name,
    shortInfo: dbPlace.short_info || '',
    mainText: dbPlace.main_text || '',
    category: dbPlace.category,
    mainMedia: transformMedia(dbPlace.main_media),
    gallery: transformGallery(dbPlace.gallery),
    location: dbPlace.latitude && dbPlace.longitude ? {
      latitude: dbPlace.latitude,
      longitude: dbPlace.longitude,
      address: dbPlace.address || '',
    } : undefined,
    createdAt: new Date(dbPlace.created_at),
    updatedAt: new Date(dbPlace.updated_at),
  };
}

// Transform database culture to app culture format
function transformCulture(dbCulture: DbCulture): CultureItem {
  return {
    id: dbCulture.id,
    title: dbCulture.title,
    shortInfo: dbCulture.short_info || '',
    mainText: dbCulture.main_text || '',
    category: dbCulture.category,
    mainMedia: transformMedia(dbCulture.main_media),
    gallery: transformGallery(dbCulture.gallery),
    createdAt: new Date(dbCulture.created_at),
    updatedAt: new Date(dbCulture.updated_at),
  };
}

// Transform database food to app food format
function transformFood(dbFood: DbFood): FoodItem {
  return {
    id: dbFood.id,
    name: dbFood.name,
    shortInfo: dbFood.short_info || '',
    mainText: dbFood.main_text || '',
    category: dbFood.category as FoodItem['category'],
    ingredients: dbFood.ingredients || undefined,
    mainMedia: transformMedia(dbFood.main_media),
    gallery: transformGallery(dbFood.gallery),
    createdAt: new Date(dbFood.created_at),
    updatedAt: new Date(dbFood.updated_at),
  };
}

// ============================================
// API FUNCTIONS
// ============================================

/**
 * Fetch all places
 */
export async function getPlaces(): Promise<Place[]> {
  const client = ensureSupabase();
  const { data, error } = await client
    .from('places_with_media')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data || []).map(transformPlace);
}

/**
 * Fetch a single place by ID
 */
export async function getPlaceById(id: string): Promise<Place | null> {
  const client = ensureSupabase();
  const { data, error } = await client
    .from('places_with_media')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // Not found
    throw error;
  }
  return data ? transformPlace(data) : null;
}

/**
 * Fetch all culture items
 */
export async function getCulture(): Promise<CultureItem[]> {
  const client = ensureSupabase();
  const { data, error } = await client
    .from('culture_with_media')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data || []).map(transformCulture);
}

/**
 * Fetch a single culture item by ID
 */
export async function getCultureById(id: string): Promise<CultureItem | null> {
  const client = ensureSupabase();
  const { data, error } = await client
    .from('culture_with_media')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // Not found
    throw error;
  }
  return data ? transformCulture(data) : null;
}

/**
 * Fetch all food items
 */
export async function getFood(): Promise<FoodItem[]> {
  const client = ensureSupabase();
  const { data, error } = await client
    .from('food_with_media')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data || []).map(transformFood);
}

/**
 * Fetch a single food item by ID
 */
export async function getFoodById(id: string): Promise<FoodItem | null> {
  const client = ensureSupabase();
  const { data, error } = await client
    .from('food_with_media')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // Not found
    throw error;
  }
  return data ? transformFood(data) : null;
}

/**
 * Search across all entities
 */
export async function searchAll(query: string): Promise<{
  places: Place[];
  culture: CultureItem[];
  food: FoodItem[];
}> {
  const client = ensureSupabase();
  const searchPattern = `%${query}%`;

  const [placesResult, cultureResult, foodResult] = await Promise.all([
    client
      .from('places_with_media')
      .select('*')
      .or(`name.ilike.${searchPattern},short_info.ilike.${searchPattern},main_text.ilike.${searchPattern}`),
    client
      .from('culture_with_media')
      .select('*')
      .or(`title.ilike.${searchPattern},short_info.ilike.${searchPattern},main_text.ilike.${searchPattern}`),
    client
      .from('food_with_media')
      .select('*')
      .or(`name.ilike.${searchPattern},short_info.ilike.${searchPattern},main_text.ilike.${searchPattern}`),
  ]);

  return {
    places: (placesResult.data || []).map(transformPlace),
    culture: (cultureResult.data || []).map(transformCulture),
    food: (foodResult.data || []).map(transformFood),
  };
}
