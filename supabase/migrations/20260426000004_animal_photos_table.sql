-- Create animal_photos table
CREATE TABLE public.animal_photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  animal_id UUID NOT NULL REFERENCES public.animals(id) ON DELETE CASCADE,
  photo_url TEXT NOT NULL CHECK (length(trim(photo_url)) > 0),
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_animal_photos_animal_id ON public.animal_photos (animal_id);

ALTER TABLE public.animal_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view animal photos"
  ON public.animal_photos
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM public.animals a
      WHERE a.id = animal_id
        AND a.adoption_status = 'AVAILABLE'
    )
  );

CREATE POLICY "Listers can view their own animal photos"
  ON public.animal_photos
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM public.animals a
      JOIN public.lister_profiles lp ON lp.id = a.lister_profile_id
      WHERE a.id = animal_id
        AND lp.user_id = (SELECT auth.uid())
    )
  );

CREATE POLICY "Listers can insert animal photos"
  ON public.animal_photos
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.animals a
      JOIN public.lister_profiles lp ON lp.id = a.lister_profile_id
      WHERE a.id = animal_id
        AND lp.user_id = (SELECT auth.uid())
    )
  );

CREATE POLICY "Listers can update animal photos"
  ON public.animal_photos
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1
      FROM public.animals a
      JOIN public.lister_profiles lp ON lp.id = a.lister_profile_id
      WHERE a.id = animal_id
        AND lp.user_id = (SELECT auth.uid())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.animals a
      JOIN public.lister_profiles lp ON lp.id = a.lister_profile_id
      WHERE a.id = animal_id
        AND lp.user_id = (SELECT auth.uid())
    )
  );

CREATE POLICY "Listers can delete animal photos"
  ON public.animal_photos
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1
      FROM public.animals a
      JOIN public.lister_profiles lp ON lp.id = a.lister_profile_id
      WHERE a.id = animal_id
        AND lp.user_id = (SELECT auth.uid())
    )
  );

-- Remove photo_url from animals table
ALTER TABLE public.animals DROP COLUMN photo_url;
