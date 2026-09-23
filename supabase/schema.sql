-- EXO ADVANCE LLC - Schema for Supabase Postgres
-- Execute this script in Supabase Dashboard -> SQL Editor

-- 1. LEADS TABLE
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  full_name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  service TEXT NOT NULL DEFAULT 'General Inquiry',
  message TEXT NOT NULL DEFAULT '',
  source TEXT NOT NULL DEFAULT 'website',
  status TEXT NOT NULL DEFAULT 'new',
  notes TEXT
);

-- Ensure all required columns exist
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS company TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS service TEXT DEFAULT 'General Inquiry';
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS message TEXT DEFAULT '';
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'website';
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'new';
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS notes TEXT;

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Safely drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Allow public insert into leads" ON public.leads;
DROP POLICY IF EXISTS "Allow authenticated full access to leads" ON public.leads;
DROP POLICY IF EXISTS "Allow full access to leads" ON public.leads;

CREATE POLICY "Allow full access to leads" 
  ON public.leads 
  FOR ALL 
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- 2. INTERACTIONS TABLE
CREATE TABLE IF NOT EXISTS public.interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  type TEXT NOT NULL DEFAULT 'note', -- 'website_inquiry', 'ai_response', 'note', 'status_change'
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  sentiment TEXT,
  ai_score NUMERIC
);

-- Ensure all required columns exist
ALTER TABLE public.interactions ADD COLUMN IF NOT EXISTS lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE;
ALTER TABLE public.interactions ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'note';
ALTER TABLE public.interactions ADD COLUMN IF NOT EXISTS content TEXT;
ALTER TABLE public.interactions ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.interactions ADD COLUMN IF NOT EXISTS sentiment TEXT;
ALTER TABLE public.interactions ADD COLUMN IF NOT EXISTS ai_score NUMERIC;

-- Enable Row Level Security
ALTER TABLE public.interactions ENABLE ROW LEVEL SECURITY;

-- Safely drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Allow public insert into interactions" ON public.interactions;
DROP POLICY IF EXISTS "Allow authenticated full access to interactions" ON public.interactions;
DROP POLICY IF EXISTS "Allow full access to interactions" ON public.interactions;

CREATE POLICY "Allow full access to interactions" 
  ON public.interactions 
  FOR ALL 
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);
