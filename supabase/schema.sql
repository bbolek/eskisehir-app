-- Eskişehir App Supabase Schema
-- This schema creates tables for places, culture, and food data
-- with public read access via Row Level Security (RLS)

-- ============================================
-- CATEGORIES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    type TEXT NOT NULL CHECK (type IN ('place', 'culture', 'food')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- PLACES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS places (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    short_info TEXT,
    main_text TEXT,
    category TEXT NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CULTURE TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS culture (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    short_info TEXT,
    main_text TEXT,
    category TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- FOOD TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS food (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    short_info TEXT,
    main_text TEXT,
    category TEXT NOT NULL,
    ingredients TEXT[], -- Array of ingredients
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- MEDIA TABLE (for main_media and gallery items)
-- ============================================
CREATE TABLE IF NOT EXISTS media (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    type TEXT NOT NULL CHECK (type IN ('image', 'video')),
    url TEXT NOT NULL,
    thumbnail TEXT, -- For videos
    caption TEXT,

    -- Polymorphic association
    entity_type TEXT NOT NULL CHECK (entity_type IN ('place', 'culture', 'food')),
    entity_id UUID NOT NULL,
    is_main BOOLEAN DEFAULT FALSE, -- TRUE for main_media, FALSE for gallery items
    sort_order INTEGER DEFAULT 0,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_media_entity ON media(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_media_main ON media(entity_type, entity_id, is_main);
CREATE INDEX IF NOT EXISTS idx_places_category ON places(category);
CREATE INDEX IF NOT EXISTS idx_culture_category ON culture(category);
CREATE INDEX IF NOT EXISTS idx_food_category ON food(category);

-- ============================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE places ENABLE ROW LEVEL SECURITY;
ALTER TABLE culture ENABLE ROW LEVEL SECURITY;
ALTER TABLE food ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PUBLIC READ ACCESS POLICIES
-- ============================================
-- These policies allow anyone (including anonymous users) to read data

CREATE POLICY "Allow public read access on categories"
    ON categories FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Allow public read access on places"
    ON places FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Allow public read access on culture"
    ON culture FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Allow public read access on food"
    ON food FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Allow public read access on media"
    ON media FOR SELECT
    TO anon, authenticated
    USING (true);

-- ============================================
-- UPDATED_AT TRIGGER FUNCTION
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables
CREATE TRIGGER update_categories_updated_at
    BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_places_updated_at
    BEFORE UPDATE ON places
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_culture_updated_at
    BEFORE UPDATE ON culture
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_food_updated_at
    BEFORE UPDATE ON food
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_media_updated_at
    BEFORE UPDATE ON media
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- VIEWS FOR EASIER DATA ACCESS
-- ============================================

-- View for places with their media
CREATE OR REPLACE VIEW places_with_media AS
SELECT
    p.*,
    (
        SELECT jsonb_build_object(
            'id', m.id,
            'type', m.type,
            'url', m.url,
            'thumbnail', m.thumbnail,
            'caption', m.caption
        )
        FROM media m
        WHERE m.entity_type = 'place'
        AND m.entity_id = p.id
        AND m.is_main = true
        LIMIT 1
    ) as main_media,
    (
        SELECT jsonb_agg(
            jsonb_build_object(
                'id', m.id,
                'type', m.type,
                'url', m.url,
                'thumbnail', m.thumbnail,
                'caption', m.caption
            ) ORDER BY m.sort_order
        )
        FROM media m
        WHERE m.entity_type = 'place'
        AND m.entity_id = p.id
        AND m.is_main = false
    ) as gallery
FROM places p;

-- View for culture with their media
CREATE OR REPLACE VIEW culture_with_media AS
SELECT
    c.*,
    (
        SELECT jsonb_build_object(
            'id', m.id,
            'type', m.type,
            'url', m.url,
            'thumbnail', m.thumbnail,
            'caption', m.caption
        )
        FROM media m
        WHERE m.entity_type = 'culture'
        AND m.entity_id = c.id
        AND m.is_main = true
        LIMIT 1
    ) as main_media,
    (
        SELECT jsonb_agg(
            jsonb_build_object(
                'id', m.id,
                'type', m.type,
                'url', m.url,
                'thumbnail', m.thumbnail,
                'caption', m.caption
            ) ORDER BY m.sort_order
        )
        FROM media m
        WHERE m.entity_type = 'culture'
        AND m.entity_id = c.id
        AND m.is_main = false
    ) as gallery
FROM culture c;

-- View for food with their media
CREATE OR REPLACE VIEW food_with_media AS
SELECT
    f.*,
    (
        SELECT jsonb_build_object(
            'id', m.id,
            'type', m.type,
            'url', m.url,
            'thumbnail', m.thumbnail,
            'caption', m.caption
        )
        FROM media m
        WHERE m.entity_type = 'food'
        AND m.entity_id = f.id
        AND m.is_main = true
        LIMIT 1
    ) as main_media,
    (
        SELECT jsonb_agg(
            jsonb_build_object(
                'id', m.id,
                'type', m.type,
                'url', m.url,
                'thumbnail', m.thumbnail,
                'caption', m.caption
            ) ORDER BY m.sort_order
        )
        FROM media m
        WHERE m.entity_type = 'food'
        AND m.entity_id = f.id
        AND m.is_main = false
    ) as gallery
FROM food f;
