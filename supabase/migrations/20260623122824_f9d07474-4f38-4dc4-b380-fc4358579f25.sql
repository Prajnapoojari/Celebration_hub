
CREATE TABLE public.celebrations (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('birthday','proposal','anniversary','friendship')),
  payload JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.celebrations TO anon, authenticated;
GRANT ALL ON public.celebrations TO service_role;
ALTER TABLE public.celebrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read celebrations" ON public.celebrations FOR SELECT USING (true);
CREATE POLICY "Anyone can create celebrations" ON public.celebrations FOR INSERT WITH CHECK (true);
