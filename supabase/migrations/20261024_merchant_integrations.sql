-- ==============================================================================
-- MIGRATION: 20261024_merchant_integrations
-- MODULE: OrderPoint POS Integration Hub (Clover, Square, Toast, Standalone)
-- ==============================================================================

-- 1. Create merchant_integrations table
CREATE TABLE IF NOT EXISTS public.merchant_integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
  provider TEXT NOT NULL, -- 'clover' | 'square' | 'toast' | 'standalone'
  status TEXT NOT NULL DEFAULT 'active', -- 'active' | 'disconnected' | 'error'
  encrypted_credentials TEXT NOT NULL, -- AES-256-GCM ciphertext:iv:authTag
  merchant_account_id TEXT, -- External Merchant/Location ID
  settings JSONB NOT NULL DEFAULT '{"auto_inject": true, "print_ticket": true, "fallback_to_kds": true}'::jsonb,
  last_synced_at TIMESTAMPTZ,
  last_error TEXT,
  CONSTRAINT unique_restaurant_provider UNIQUE (restaurant_id, provider)
);

-- 2. Add external integration tracking columns to orders table
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS external_order_id TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS external_pos_provider TEXT DEFAULT 'standalone';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS external_sync_status TEXT DEFAULT 'synced';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS external_sync_error TEXT;

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.merchant_integrations ENABLE ROW LEVEL SECURITY;

-- 4. Clean up legacy or conflicting policies
DROP POLICY IF EXISTS "Allow service_role full access to merchant_integrations" ON public.merchant_integrations;

-- 5. Hardened policy: service_role full access only (backend Next.js server actions/APIs)
CREATE POLICY "Allow service_role full access to merchant_integrations"
  ON public.merchant_integrations
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
