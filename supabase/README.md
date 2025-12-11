# Supabase Setup for Eskişehir App

## Quick Setup

### 1. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note your **Project URL** and **anon public key** from Settings > API

### 2. Run the Schema
1. Go to SQL Editor in your Supabase dashboard
2. Copy and paste the contents of `schema.sql`
3. Click "Run" to create all tables, indexes, policies, and views

### 3. Seed the Data
1. In SQL Editor, create a new query
2. Copy and paste the contents of `seed.sql`
3. Click "Run" to populate the database with initial data

### 4. Configure Your App
Add these environment variables to your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 5. Install Supabase Client
```bash
npm install @supabase/supabase-js
```

## Database Schema

### Tables

| Table | Description |
|-------|-------------|
| `categories` | Category names and types (place/culture/food) |
| `places` | Tourist places with location data |
| `culture` | Cultural items (museums, crafts, historical figures) |
| `food` | Local cuisine with ingredients |
| `media` | Images and videos for all entities |

### Views (Use these for API queries)

| View | Description |
|------|-------------|
| `places_with_media` | Places with main_media and gallery as JSON |
| `culture_with_media` | Culture items with main_media and gallery as JSON |
| `food_with_media` | Food items with main_media and gallery as JSON |

## API Usage Examples

### Fetching All Places
```typescript
import { getPlaces } from '@/supabase/client';

const places = await getPlaces();
```

### Fetching a Single Place
```typescript
import { getPlaceById } from '@/supabase/client';

const place = await getPlaceById('a1b2c3d4-e5f6-7890-abcd-ef1234567801');
```

### Fetching by Category
```typescript
import { getPlacesByCategory } from '@/supabase/client';

const historicPlaces = await getPlacesByCategory('Tarihi Yerler');
```

### Direct Supabase Query (REST API)
```bash
# Get all places with media
curl 'https://YOUR_PROJECT.supabase.co/rest/v1/places_with_media?select=*' \
  -H "apikey: YOUR_ANON_KEY"

# Get food by category
curl 'https://YOUR_PROJECT.supabase.co/rest/v1/food_with_media?category=eq.yemek&select=*' \
  -H "apikey: YOUR_ANON_KEY"

# Search places
curl 'https://YOUR_PROJECT.supabase.co/rest/v1/places_with_media?name=ilike.*Porsuk*&select=*' \
  -H "apikey: YOUR_ANON_KEY"
```

## Media Management

The `media` table supports **unlimited images and videos** per entity:

- `is_main = true` → Main/featured media
- `is_main = false` → Gallery items
- `type = 'image'` → Image URL
- `type = 'video'` → YouTube or video URL (with optional thumbnail)
- `sort_order` → Controls display order in gallery

### Adding Media to an Entity
```sql
-- Add a YouTube video to a place
INSERT INTO media (entity_type, entity_id, type, url, thumbnail, caption, is_main, sort_order)
VALUES (
  'place',
  'a1b2c3d4-e5f6-7890-abcd-ef1234567801',
  'video',
  'https://www.youtube.com/watch?v=VIDEO_ID',
  'https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg',
  'Video description',
  false,
  10
);

-- Add an image to food
INSERT INTO media (entity_type, entity_id, type, url, caption, is_main, sort_order)
VALUES (
  'food',
  'c1b2c3d4-e5f6-7890-abcd-ef1234567801',
  'image',
  'https://example.com/image.jpg',
  'Image caption',
  false,
  5
);
```

## Row Level Security (RLS)

All tables have RLS enabled with **public read access**:
- Anonymous users (`anon`) can SELECT data
- Authenticated users can also SELECT data
- Write operations require additional policies (add as needed for admin)

### Adding Admin Write Access
```sql
-- Example: Allow authenticated users to insert places
CREATE POLICY "Allow authenticated insert on places"
    ON places FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Example: Allow authenticated users to update places
CREATE POLICY "Allow authenticated update on places"
    ON places FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);
```

## File Structure
```
supabase/
├── schema.sql    # Database schema (tables, indexes, RLS, views)
├── seed.sql      # Initial data from JSON files
├── types.ts      # TypeScript type definitions
├── client.ts     # Supabase client and API functions
└── README.md     # This file
```
