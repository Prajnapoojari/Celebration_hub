
DROP POLICY "Anyone can create reasonably sized celebrations" ON public.celebrations;
CREATE POLICY "Anyone can create reasonably sized celebrations" ON public.celebrations
  FOR INSERT WITH CHECK (octet_length(payload::text) < 3000000);
