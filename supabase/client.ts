import { createClient } from '@supabase/supabase-js';
import type { Database, PlaceWithMedia, CultureWithMedia, FoodWithMedia, Category } from './types';

// Initialize Supabase client
// Replace these with your actual Supabase URL and anon key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// ============================================
// PUBLIC API FUNCTIONS (No auth required)
// ============================================

/**
 * Fetch all places with their media
 */
export async function getPlaces(): Promise<PlaceWithMedia[]> {
  const { data, error } = await supabase
    .from('places_with_media')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) throw error;
  return data || [];
}

/**
 * Fetch a single place by ID
 */
export async function getPlaceById(id: string): Promise<PlaceWithMedia | null> {
  const { data, error } = await supabase
    .from('places_with_media')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Fetch places by category
 */
export async function getPlacesByCategory(category: string): Promise<PlaceWithMedia[]> {
  const { data, error } = await supabase
    .from('places_with_media')
    .select('*')
    .eq('category', category)
    .order('sort_order', { ascending: true });

  if (error) throw error;
  return data || [];
}

/**
 * Fetch all culture items with their media
 */
export async function getCulture(): Promise<CultureWithMedia[]> {
  const { data, error } = await supabase
    .from('culture_with_media')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) throw error;
  return data || [];
}

/**
 * Fetch a single culture item by ID
 */
export async function getCultureById(id: string): Promise<CultureWithMedia | null> {
  const { data, error } = await supabase
    .from('culture_with_media')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Fetch culture items by category
 */
export async function getCultureByCategory(category: string): Promise<CultureWithMedia[]> {
  const { data, error } = await supabase
    .from('culture_with_media')
    .select('*')
    .eq('category', category)
    .order('sort_order', { ascending: true });

  if (error) throw error;
  return data || [];
}

/**
 * Fetch all food items with their media
 */
export async function getFood(): Promise<FoodWithMedia[]> {
  const { data, error } = await supabase
    .from('food_with_media')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) throw error;
  return data || [];
}

/**
 * Fetch a single food item by ID
 */
export async function getFoodById(id: string): Promise<FoodWithMedia | null> {
  const { data, error } = await supabase
    .from('food_with_media')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Fetch food items by category
 */
export async function getFoodByCategory(category: string): Promise<FoodWithMedia[]> {
  const { data, error } = await supabase
    .from('food_with_media')
    .select('*')
    .eq('category', category)
    .order('sort_order', { ascending: true });

  if (error) throw error;
  return data || [];
}

/**
 * Fetch all categories
 */
export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true });

  if (error) throw error;
  return data || [];
}

/**
 * Fetch categories by type (place, culture, food)
 */
export async function getCategoriesByType(type: 'place' | 'culture' | 'food'): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('type', type)
    .order('name', { ascending: true });

  if (error) throw error;
  return data || [];
}

/**
 * Search across all entities
 */
export async function search(query: string): Promise<{
  places: PlaceWithMedia[];
  culture: CultureWithMedia[];
  food: FoodWithMedia[];
}> {
  const searchTerm = `%${query}%`;

  const [placesResult, cultureResult, foodResult] = await Promise.all([
    supabase
      .from('places_with_media')
      .select('*')
      .or(`name.ilike.${searchTerm},short_info.ilike.${searchTerm},main_text.ilike.${searchTerm}`)
      .order('sort_order', { ascending: true }),
    supabase
      .from('culture_with_media')
      .select('*')
      .or(`title.ilike.${searchTerm},short_info.ilike.${searchTerm},main_text.ilike.${searchTerm}`)
      .order('sort_order', { ascending: true }),
    supabase
      .from('food_with_media')
      .select('*')
      .or(`name.ilike.${searchTerm},short_info.ilike.${searchTerm},main_text.ilike.${searchTerm}`)
      .order('sort_order', { ascending: true }),
  ]);

  return {
    places: placesResult.data || [],
    culture: cultureResult.data || [],
    food: foodResult.data || [],
  };
}
