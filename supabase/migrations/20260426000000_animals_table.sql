CREATE TYPE animal_species AS ENUM ('DOG', 'CAT', 'BIRD', 'RABBIT', 'OTHER');
CREATE TYPE animal_adoption_status AS ENUM ('AVAILABLE', 'RESERVED', 'ADOPTED');
CREATE TYPE animal_size AS ENUM ('SMALL', 'MEDIUM', 'LARGE');
CREATE TYPE animal_sex AS ENUM ('MALE', 'FEMALE', 'UNKNOWN');

CREATE TABLE public.animals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lister_profile_id UUID NOT NULL REFERENCES public.lister_profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  species animal_species NOT NULL,
  photo_url TEXT NOT NULL CHECK (photo_url ~* '^https?://'),
  birth_date DATE NOT NULL CHECK (birth_date <= CURRENT_DATE),
  latitude DOUBLE PRECISION NOT NULL CHECK (latitude >= -90 AND latitude <= 90),
  longitude DOUBLE PRECISION NOT NULL CHECK (longitude >= -180 AND longitude <= 180),
  city TEXT,
  state TEXT,
  country TEXT,
  health_notes TEXT,
  behavior_notes TEXT,
  interesting_facts TEXT,
  adoption_status animal_adoption_status NOT NULL DEFAULT 'AVAILABLE',
  is_neutered BOOLEAN,
  is_vaccinated BOOLEAN,
  size animal_size,
  sex animal_sex,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_animals_lister_profile_id ON public.animals (lister_profile_id);
CREATE INDEX idx_animals_species ON public.animals (species);
CREATE INDEX idx_animals_adoption_status ON public.animals (adoption_status);
CREATE INDEX idx_animals_species_status_created_at ON public.animals (species, adoption_status, created_at DESC);
CREATE INDEX idx_animals_latitude ON public.animals (latitude);
CREATE INDEX idx_animals_longitude ON public.animals (longitude);

ALTER TABLE public.animals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view available animals"
  ON public.animals
  FOR SELECT
  USING (adoption_status = 'AVAILABLE');

CREATE POLICY "Listers can view their own animals"
  ON public.animals
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM public.lister_profiles lp
      WHERE lp.id = lister_profile_id
        AND lp.user_id = (SELECT auth.uid())
    )
  );

CREATE POLICY "Listers can insert their own animals"
  ON public.animals
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.lister_profiles lp
      WHERE lp.id = lister_profile_id
        AND lp.user_id = (SELECT auth.uid())
    )
  );

CREATE POLICY "Listers can update their own animals"
  ON public.animals
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1
      FROM public.lister_profiles lp
      WHERE lp.id = lister_profile_id
        AND lp.user_id = (SELECT auth.uid())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.lister_profiles lp
      WHERE lp.id = lister_profile_id
        AND lp.user_id = (SELECT auth.uid())
    )
  );

CREATE POLICY "Listers can delete their own animals"
  ON public.animals
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1
      FROM public.lister_profiles lp
      WHERE lp.id = lister_profile_id
        AND lp.user_id = (SELECT auth.uid())
    )
  );

CREATE TRIGGER set_updated_at_animals
  BEFORE UPDATE ON public.animals
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
