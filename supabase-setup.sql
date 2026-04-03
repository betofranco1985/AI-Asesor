-- ================================================================
-- AI Asesor Financiero — Script de base de datos para Supabase
-- Ejecuta este script en: Supabase → SQL Editor → New Query
-- ================================================================

-- Tabla para guardar todos los datos financieros de cada usuario
create table if not exists user_financial_data (
  id           uuid default gen_random_uuid() primary key,
  user_id      uuid references auth.users(id) on delete cascade unique not null,
  incomes      jsonb not null default '[]'::jsonb,
  expenses     jsonb not null default '[]'::jsonb,
  assets       jsonb not null default '[]'::jsonb,
  liabilities  jsonb not null default '[]'::jsonb,
  history      jsonb not null default '[]'::jsonb,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

-- Seguridad: cada usuario solo puede ver y editar sus propios datos
alter table user_financial_data enable row level security;

create policy "Ver propios datos"
  on user_financial_data for select
  using (auth.uid() = user_id);

create policy "Crear propios datos"
  on user_financial_data for insert
  with check (auth.uid() = user_id);

create policy "Editar propios datos"
  on user_financial_data for update
  using (auth.uid() = user_id);

create policy "Eliminar propios datos"
  on user_financial_data for delete
  using (auth.uid() = user_id);
