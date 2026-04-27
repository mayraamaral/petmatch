DROP POLICY IF EXISTS "Anyone can view available animals" ON public.animals;
DROP POLICY IF EXISTS "Listers can view their own animals" ON public.animals;

CREATE POLICY "Read available or own animals"
  ON public.animals
  FOR SELECT
  USING (
    adoption_status = 'AVAILABLE'
    OR EXISTS (
      SELECT 1
      FROM public.lister_profiles lp
      WHERE lp.id = lister_profile_id
        AND lp.user_id = (SELECT auth.uid())
    )
  );
