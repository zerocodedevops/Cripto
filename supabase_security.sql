-- Enable Row Level Security
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stylists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Policy for SERVICES: Everyone can view (Select)
CREATE POLICY "Public Read Services"
ON public.services
FOR SELECT
TO anon, authenticated
USING (true);

-- Policy for STYLISTS: Everyone can view (Select)
CREATE POLICY "Public Read Stylists"
ON public.stylists
FOR SELECT
TO anon, authenticated
USING (true);

-- Policy for BOOKINGS: Public can Insert (Create bookings)
CREATE POLICY "Public Insert Bookings"
ON public.bookings
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Optional: Allow public to see bookings (if needed for verification, otherwise keep hidden)
-- For now, let's allow it so your verification works effortlessly, 
-- but in production you'd want to restrict this.
CREATE POLICY "Public Read Bookings"
ON public.bookings
FOR SELECT
TO anon, authenticated
USING (true);
