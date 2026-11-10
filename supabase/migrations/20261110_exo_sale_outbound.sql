-- ==============================================================================
-- MIGRATION: 20261110_exo_sale_outbound
-- MODULE: EXO SALE B2B Outbound Cold Outreach & Signal Scraping Engine
-- ==============================================================================

-- 1. CAMPAIGNS TABLE
CREATE TABLE IF NOT EXISTS public.campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'ACTIVE', -- 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'COMPLETED'
  niche_config JSONB NOT NULL DEFAULT '{}'::jsonb,
  inclusion_criteria JSONB NOT NULL DEFAULT '{}'::jsonb,
  exclusion_criteria JSONB NOT NULL DEFAULT '{}'::jsonb,
  send_params JSONB NOT NULL DEFAULT '{"daily_limit": 50, "send_window": "09:00-17:00", "min_score": 75}'::jsonb
);

-- 2. PROSPECTS TABLE
CREATE TABLE IF NOT EXISTS public.prospects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE SET NULL,
  domain TEXT NOT NULL,
  url TEXT NOT NULL,
  company_name TEXT,
  contact_name TEXT,
  role TEXT,
  email TEXT,
  email_status TEXT NOT NULL DEFAULT 'unknown',
  score INTEGER NOT NULL DEFAULT 0,
  priority_tier TEXT NOT NULL DEFAULT 'tier_3_low', -- 'tier_1_high' | 'tier_2_medium' | 'tier_3_low'
  status TEXT NOT NULL DEFAULT 'READY_REVIEW', -- 'DISCOVERED' | 'SCRAPED' | 'READY_REVIEW' | 'APPROVED' | 'SENT' | 'REPLIED' | 'DISCARDED'
  signals JSONB NOT NULL DEFAULT '{}'::jsonb,
  scrape_metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  personalization_notes TEXT
);

CREATE INDEX IF NOT EXISTS ix_prospects_domain ON public.prospects (domain);
CREATE INDEX IF NOT EXISTS ix_prospects_status_score ON public.prospects (status, score DESC);

-- 3. EMAIL LOGS TABLE
CREATE TABLE IF NOT EXISTS public.email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  prospect_id UUID NOT NULL REFERENCES public.prospects(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE SET NULL,
  step_number INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'READY_REVIEW', -- 'DRAFTED' | 'READY_REVIEW' | 'APPROVED' | 'SENT' | 'OPENED' | 'REPLIED' | 'BOUNCED' | 'DISCARDED'
  draft_subject TEXT NOT NULL,
  draft_body TEXT NOT NULL,
  final_subject TEXT,
  final_body TEXT,
  sender_email TEXT DEFAULT 'contact@exoadvancellc.com',
  recipient_email TEXT NOT NULL,
  message_id TEXT,
  gate_check_result JSONB NOT NULL DEFAULT '{"passed": true, "reasons": []}'::jsonb,
  sent_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS ix_email_logs_prospect ON public.email_logs (prospect_id);
CREATE INDEX IF NOT EXISTS ix_email_logs_status ON public.email_logs (status);

-- 4. SIGNAL OBSERVATIONS TABLE
CREATE TABLE IF NOT EXISTS public.signal_observations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  prospect_id UUID NOT NULL REFERENCES public.prospects(id) ON DELETE CASCADE,
  company_domain TEXT NOT NULL,
  collector TEXT NOT NULL,
  signal_code TEXT NOT NULL,
  category TEXT NOT NULL,
  value_num NUMERIC,
  value_text TEXT,
  confidence NUMERIC NOT NULL DEFAULT 1.0
);

-- 5. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prospects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.signal_observations ENABLE ROW LEVEL SECURITY;

-- 6. RLS POLICIES FOR SERVICE ROLE (SERVER BACKEND)
DROP POLICY IF EXISTS "Allow service_role full access to campaigns" ON public.campaigns;
CREATE POLICY "Allow service_role full access to campaigns" ON public.campaigns FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow service_role full access to prospects" ON public.prospects;
CREATE POLICY "Allow service_role full access to prospects" ON public.prospects FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow service_role full access to email_logs" ON public.email_logs;
CREATE POLICY "Allow service_role full access to email_logs" ON public.email_logs FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow service_role full access to signal_observations" ON public.signal_observations;
CREATE POLICY "Allow service_role full access to signal_observations" ON public.signal_observations FOR ALL TO service_role USING (true) WITH CHECK (true);
