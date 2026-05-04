-- Allow ANY authenticated user to read animal photos
-- Adopters need to see photos of animals they are browsing

DROP POLICY IF EXISTS "animals_read_all" ON storage.objects;
CREATE POLICY "animals_read_all"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'animals'
  );