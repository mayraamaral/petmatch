-- Migration to create the get_nearby_animals RPC function
-- Uses the Haversine formula to calculate distance in kilometers

CREATE OR REPLACE FUNCTION get_nearby_animals(
  user_lat DOUBLE PRECISION,
  user_lon DOUBLE PRECISION,
  radius_km DOUBLE PRECISION DEFAULT 50
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  species animal_species,
  sex animal_sex,
  size animal_size,
  birth_date DATE,
  city TEXT,
  state TEXT,
  distance_km DOUBLE PRECISION,
  photo_url TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT * FROM (
    SELECT
      a.id,
      a.name,
      a.species,
      a.sex,
      a.size,
      a.birth_date,
      a.city,
      a.state,
      (
        6371 * acos(
          cos(radians(user_lat)) * cos(radians(a.latitude)) *
          cos(radians(a.longitude) - radians(user_lon)) +
          sin(radians(user_lat)) * sin(radians(a.latitude))
        )
      ) AS distance_km,
      (
        SELECT ap.photo_url
        FROM public.animal_photos ap
        WHERE ap.animal_id = a.id
        ORDER BY ap.display_order ASC
        LIMIT 1
      ) AS photo_url
    FROM
      public.animals a
    WHERE
      a.adoption_status = 'AVAILABLE'
  ) AS nearby_animals
  WHERE
    nearby_animals.distance_km <= radius_km
  ORDER BY
    nearby_animals.distance_km ASC;
END;
$$;
