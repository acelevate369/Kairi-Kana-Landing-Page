-- Copy dan Paste code ini ke Supabase Dashboard > SQL Editor
-- Lalu klik RUN.

-- 1. Mengaktifkan RLS (biasanya sudah aktif)
ALTER TABLE whitelist ENABLE ROW LEVEL SECURITY;

-- 2. Membuat Policy agar Public (siapapun di landing page) bisa input/insert email
CREATE POLICY "Enable insert for everyone" 
ON whitelist 
FOR INSERT 
TO public 
WITH CHECK (true);

-- 3. (Opsional) Policy agar data cuma bisa dilihat oleh admin text (service_role)
-- Jadi public ga bisa 'SELECT' atau baca daftar email orang lain.
CREATE POLICY "Enable read access for service role only" 
ON whitelist 
FOR SELECT 
TO service_role 
USING (true);
