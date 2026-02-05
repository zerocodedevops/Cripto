/* Módulo 1: Actualización para Pagos Simulados */

/* 1. Crear tipo ENUM para el estado del pago (con manejo de errores si ya existe) */
DO $$ BEGIN
    CREATE TYPE payment_status_type AS ENUM ('pending', 'paid', 'refunded', 'failed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

/* 2. Añadir columnas a la tabla bookings */
ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS payment_status payment_status_type DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS deposit_amount DECIMAL(10, 2) DEFAULT 0.00,
ADD COLUMN IF NOT EXISTS payment_id TEXT;

/* 3. Crear políticas RLS (con manejo de errores si ya existen) */
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
    CREATE POLICY "Users can view their own bookings" 
    ON bookings FOR SELECT 
    USING (auth.uid() = user_id);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE POLICY "Users can insert their own bookings" 
    ON bookings FOR INSERT 
    WITH CHECK (auth.uid() = user_id);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

/* 4. Policy for Admins to view and update all bookings */
DO $$ BEGIN
    CREATE POLICY "Admins can do everything" 
    ON bookings FOR ALL 
    USING (auth.jwt() ->> 'email' = 'admin@zerocodedevops.com' OR (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin')
    WITH CHECK (auth.jwt() ->> 'email' = 'admin@zerocodedevops.com' OR (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;
