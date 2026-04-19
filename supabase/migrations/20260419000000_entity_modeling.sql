-- Create Enums
CREATE TYPE user_role AS ENUM ('ADOPTER', 'LISTER');
CREATE TYPE lister_type AS ENUM ('INDIVIDUAL', 'SHELTER');

-- Create Base Users Table (Syncs with auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  role user_role NOT NULL,
  profile_picture_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Adopter Profiles
CREATE TABLE public.adopter_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Lister Profiles
CREATE TABLE public.lister_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  lister_type lister_type NOT NULL,
  name TEXT,
  trade_name TEXT,
  corporate_name TEXT,
  cnpj TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.adopter_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lister_profiles ENABLE ROW LEVEL SECURITY;

-- Basic Policies (Users can read/update their own data).
-- Inserts are handled by the handle_new_user trigger below (SECURITY DEFINER),
-- so we only expose an INSERT policy that matches the authenticated owner.
CREATE POLICY "Users can insert their own record" ON public.users FOR INSERT WITH CHECK ((select auth.uid()) = id);
CREATE POLICY "Users can view their own record" ON public.users FOR SELECT USING ((select auth.uid()) = id);
CREATE POLICY "Users can update their own record" ON public.users FOR UPDATE USING ((select auth.uid()) = id);

CREATE POLICY "Users can insert their own adopter profile" ON public.adopter_profiles FOR INSERT WITH CHECK ((select auth.uid()) = user_id);
CREATE POLICY "Users can view their own adopter profile" ON public.adopter_profiles FOR SELECT USING ((select auth.uid()) = user_id);
CREATE POLICY "Users can update their own adopter profile" ON public.adopter_profiles FOR UPDATE USING ((select auth.uid()) = user_id);

-- Listers are usually public so adopters can see who is donating the pet
CREATE POLICY "Listers can insert their own profile" ON public.lister_profiles FOR INSERT WITH CHECK ((select auth.uid()) = user_id);
CREATE POLICY "Anyone can view lister profiles" ON public.lister_profiles FOR SELECT USING (true);
CREATE POLICY "Listers can update their own profile" ON public.lister_profiles FOR UPDATE USING ((select auth.uid()) = user_id);

-- Auto-create public.users + role-specific profile when a new auth.users row is inserted.
-- Runs as SECURITY DEFINER to bypass RLS. Reads payload from raw_user_meta_data,
-- which the client sets via supabase.auth.signUp({ options: { data: {...} } }).
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_role public.user_role;
  v_lister_type public.lister_type;
BEGIN
  IF NEW.raw_user_meta_data IS NULL OR NEW.raw_user_meta_data->>'role' IS NULL THEN
    RAISE EXCEPTION 'Missing role in user metadata';
  END IF;

  v_role := (NEW.raw_user_meta_data->>'role')::public.user_role;

  INSERT INTO public.users (id, email, role)
  VALUES (NEW.id, NEW.email, v_role);

  IF v_role = 'ADOPTER' THEN
    INSERT INTO public.adopter_profiles (user_id, name)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'name');
  ELSE
    v_lister_type := (NEW.raw_user_meta_data->>'lister_type')::public.lister_type;

    INSERT INTO public.lister_profiles (
      user_id,
      lister_type,
      name,
      trade_name,
      corporate_name,
      cnpj
    )
    VALUES (
      NEW.id,
      v_lister_type,
      NULLIF(NEW.raw_user_meta_data->>'name', ''),
      NULLIF(NEW.raw_user_meta_data->>'trade_name', ''),
      NULLIF(NEW.raw_user_meta_data->>'corporate_name', ''),
      NULLIF(NEW.raw_user_meta_data->>'cnpj', '')
    );
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
