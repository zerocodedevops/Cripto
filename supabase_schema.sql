-- 1. Create Tables
create table public.services (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  category text not null,
  title text not null,
  description text,
  duration text not null,
  price numeric
);

create table public.stylists (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  role text not null,
  image_url text,
  available boolean default true
);

create table public.bookings (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  stylist_id uuid references public.stylists(id),
  date date not null,
  time time not null,
  status text default 'pending',
  customer_notes text,
  service_ids text[]
);

-- 2. Insert Data (Services)
-- COLOR
insert into public.services (category, title, description, duration) values
('color', 'Henna', 'Henna raices', '1h 10 min'),
('color', 'Tinte Raiz', 'Retoque de raices', '1h 15 min'),
('color', 'Mechas', 'Nuestra famosa técnica Mix&Match, sutiles brillos que iluminan', '1h 55 min'),
('color', 'Retoque de mechas', 'Media cabeza de mechas. Zona superior y laterales', '1h 40 min'),
('color', 'Medio retoque de mechas', 'Solo contorno y zona superior', '1h 20 min'),
('color', 'Apaño mechas', 'Solo contorno y raya', '1h 10 min'),
('color', 'Babylight', 'Mechas extra finas por todo el cabello', '1h 55 min'),
('color', 'Balayage', 'Mechas a mano alzada degradadas y con falsa raíz', '2h 5 min'),
('color', 'Puntos de luz PPC', 'Puntos de luz en toda la melena para dar un punto de color natural', '1h 55 min'),
('color', 'Mechas y henna', 'Mechas en todo el cabello más nuestro barro/ henna para cubrir canas', '2h 5 min'),
('color', 'Tinte y reflejos', 'Retoque de raíz más reflejos en todo el cabello', '2h'),
('color', 'Retoque de Henna', 'Retoque de raíces en media cabeza, zona superior y laterales', '1h 5 min'),
('color', 'Retoque tinte', 'Raíces de media cabeza, zona superior y laterales', '1h 5 min'),
('color', 'Mini apaño', 'Retoque de contorno y raya.', '1h 5 min'),
('color', 'Matiz', 'Coloración suave para cambiar el tono de la melena y dar brillo', '20 min'),
('color', 'Agua clara', 'Clarificante para base natural que desea dar un toque más claro', '55 min'),
('color', 'Decoloración', 'Decoración de raíz para dejar el pelo rubio o eliminar un tinte', '1h 20 min'),
('color', 'Mechas y Manicura', 'Trabajo de mechas de cualquier tipo. Incluye manicura', '1h 50 min'),
('color', 'Tinte y Manicura', 'Aplicación tinte y en tiempo de exposición manicura completa', '1h 20 min');

-- CORTES
insert into public.services (category, title, description, duration) values
('cortes', 'Lavar y corte', 'Solo Corte y lavar *NO INCLUYE PEINADO', '40 min'),
('cortes', 'Corte hombre', 'CORTE CON ESTILO', '35 min'),
('cortes', 'Corte niño/A', 'Corte niñ@ hasta 8 años', '20 min'),
('cortes', 'Corte de flequillo', 'Retoque de flequillo', '10 min');

-- PEINAR Y SECAR
insert into public.services (category, title, description, duration) values
('peinar', 'Peinar', 'Servicio para añadir al corte o a servicio de color', '25 min'),
('peinar', 'Peinar tenacilla/plancha', 'TENACILLA/PLANCHA', '45 min'),
('peinar', 'Lavar+ Peinar', 'Solo para servicio único de peinado, incluye el lavado', '40 min'),
('peinar', 'Secar frontal', 'Secado del cabello al aire con peinado en la zona del contorno', '10 min'),
('peinar', 'Secar difusor', 'Secado del cabello con difusor', '15 min'),
('peinar', 'Recogido', 'Recogido, incluye lavado y peinado', '1h 15 min'),
('peinar', 'Trenza o semirecogido', 'Peinado y trenza o semirecogido, incluye lavado', '1h');

-- TRATAMIENTOS
insert into public.services (category, title, description, duration) values
('tratamientos', 'Shift Detoxificante', 'TRATAMIENTO DETOXIFICANTE CAPILAR, PARA UN CUERO CABELLUDO GRASO O CON CASPA', '35 min'),
('tratamientos', 'Olaplex Reestructuración', 'TRATAMIENTO RECONSTRUCTIVO Y FORTALECEDOR', '1h 20 min'),
('tratamientos', 'Inner hidratación', 'TRATAMIENTO HIDRATANTE PARA RELLENAR EL PELO DE AGUA', '50 min'),
('tratamientos', 'Nourising nutrición', 'TRATAMIENTO BIFÁSICO NUTRITIVO PARA ENGROSAR Y DAR BRILLO', '1h 15 min'),
('tratamientos', 'Nourising Inner', 'TRATAMIENTO BIFÁSICO, COMBINA LOS INGREDIENTES MAS HUMECTANTES', '1h'),
('tratamientos', 'Repumpling Hidratación', 'TRATAMIENTO BIFÁSICO HIDRATANTE Y HUMECTANTE DE ÁCIDO HIALURÓNICO', '45 min'),
('tratamientos', 'Proshild Proteínas', 'Tratamiento antioxidante para engrosar, dar fuerza y aportar proteínas', '1h'),
('tratamientos', 'Stain Glass Baño Brillo', 'BAÑO DE BRILLO efecto espejo. Cuando la luz choque contra el cabello deslumbrará', '1h'),
('tratamientos', 'Antifrizz', 'TRATAMIENTO ANTIENCRESPAMIENTO', '2h 40 min'),
('tratamientos', 'Alisado', 'TRATAMIENTO TERMOACTIVO PARA ALISAR EL CABELLO', '2h 30 min'),
('tratamientos', 'Inner promo', null, '40 min'),
('tratamientos', 'Arkitech', 'TRATAMIENTO DE REESTRUCTURACION , APORTA BRILLO Y FUERZA', '35 min'),
('tratamientos', 'NO BREAKER', null, '45 min'),
('tratamientos', 'Colágeno', 'Tratamiento de hidratación y fuerza, de un brillo espectacular', '30 min');

-- NAILS
insert into public.services (category, title, description, duration) values
('nails', 'Manicura exprés', 'Limar, hidratación de cutículas y manos, esmaltado color.', '20 min'),
('nails', 'Esmaltar uñas', 'Solo incluye esmaltado de uñas con OPI', '10 min'),
('nails', 'Manicura', 'Manicura completa by OPI. Limar, exfoliante de cutícula, retirar pieles', '30 min'),
('nails', 'Manicura hombre', null, '25 min'),
('nails', 'Gel Opi', null, '20 min'),
('nails', 'Pedicura by OPI', 'Pedicura completa, limado de planta con la fabulosa lima de OPI', '1h'),
('nails', 'Pedicura expréss', 'Limar,hidratacion de cutículas , masaje y esmaltado', '30 min');

-- MAQUILLAJE Y DEPILACIÓN
insert into public.services (category, title, description, duration) values
('makeup-depil', 'Maquillaje', 'MAKE UP DE LO MÁS NATURAL Y FAVORECEDOR', '55 min'),
('makeup-depil', 'Limpieza cejas', null, '10 min'),
('makeup-depil', 'Labio', null, '10 min');

-- EXTENSIONES
insert into public.services (category, title, description, duration) values
('extensiones', 'Poner extensiones', 'Poner extensiónes. Contactar con el salón, es un servicio complejo', '25 min'),
('extensiones', 'Quitar extensiones', 'Quitar extensiones adhesivas', '40 min');

-- 3. Insert Data (Stylists)
insert into public.stylists (name, role, available) values
('Anna Garcia', 'Master Stylist', true),
('David Torres', 'Color Expert', true),
('Elena Ruiz', 'Senior Stylist', true),
('Marc Soler', 'Barber Specialist', true),
('Sofia M.', 'Junior Stylist', true);
