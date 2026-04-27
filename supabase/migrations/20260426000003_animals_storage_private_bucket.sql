-- Private bucket policies for animal photos
-- Files are stored as: {auth.uid()}/{generated-file-name}

DROP POLICY IF EXISTS "animals_upload_own_folder" ON storage.objects;
CREATE POLICY "animals_upload_own_folder"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'animals'
    AND (storage.foldername(name))[1] = (SELECT auth.uid())::text
  );

DROP POLICY IF EXISTS "animals_read_own_folder" ON storage.objects;
CREATE POLICY "animals_read_own_folder"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'animals'
    AND (storage.foldername(name))[1] = (SELECT auth.uid())::text
  );

DROP POLICY IF EXISTS "animals_delete_own_folder" ON storage.objects;
CREATE POLICY "animals_delete_own_folder"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'animals'
    AND (storage.foldername(name))[1] = (SELECT auth.uid())::text
  );

-- photo_url now stores private storage path (not public URL)
ALTER TABLE public.animals
  DROP CONSTRAINT IF EXISTS animals_photo_url_check;

ALTER TABLE public.animals
  ADD CONSTRAINT animals_photo_url_check
  CHECK (length(trim(photo_url)) > 0);
