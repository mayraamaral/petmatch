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

-- Basic Policies (Users can read/update their own data)
CREATE POLICY "Users can view their own record" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own record" ON public.users FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view their own adopter profile" ON public.adopter_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own adopter profile" ON public.adopter_profiles FOR UPDATE USING (auth.uid() = user_id);

-- Listers are usually public so adopters can see who is donating the pet
CREATE POLICY "Anyone can view lister profiles" ON public.lister_profiles FOR SELECT USING (true);
CREATE POLICY "Listers can update their own profile" ON public.lister_profiles FOR UPDATE USING (auth.uid() = user_id);
