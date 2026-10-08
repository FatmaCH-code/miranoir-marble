-- ============================================================================
-- MIRANOIR MARBLE — Supabase schema
-- Supabase → SQL Editor → New query → paste this whole file → Run.
-- Safe to re-run.
-- ============================================================================

-- STONES ---------------------------------------------------------------------
create table if not exists stones (
  id bigint primary key generated always as identity,
  slug text unique not null,
  name text not null,
  material text not null check (material in ('mermer','granit','kuvars','porselen')),
  brand text default '',
  tone text default 'light' check (tone in ('light','dark','warm')),
  finish text default '',
  thickness text default '',
  description_tr text default '',
  description_en text default '',
  images jsonb default '[]'::jsonb,
  featured boolean default false,
  active boolean default true,
  created_at timestamptz default now()
);

-- QUOTE REQUESTS ---------------------------------------------------------------
create table if not exists quotes (
  id bigint primary key generated always as identity,
  name text not null check (char_length(name) between 1 and 120),
  phone text not null check (char_length(phone) between 3 and 40),
  email text default '',
  application text default '',
  stone text default '',
  size text default '' check (char_length(size) <= 300),
  message text default '' check (char_length(message) <= 3000),
  status text default 'new' check (status in ('new','contacted','won','lost')),
  created_at timestamptz default now()
);

-- ADMINS -----------------------------------------------------------------------
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  is_admin boolean default false
);

create or replace function handle_new_user() returns trigger as $$
begin
  insert into public.profiles (id, email) values (new.id, new.email) on conflict do nothing;
  return new;
end; $$ language plpgsql security definer set search_path = public;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function handle_new_user();

create or replace function is_admin() returns boolean as $$
  select coalesce((select is_admin from public.profiles where id = auth.uid()), false);
$$ language sql stable security definer set search_path = public;

-- ROW LEVEL SECURITY -----------------------------------------------------------
alter table stones enable row level security;
alter table quotes enable row level security;
alter table profiles enable row level security;

drop policy if exists "stones read" on stones;
create policy "stones read" on stones for select using (active or is_admin());
drop policy if exists "stones write" on stones;
create policy "stones write" on stones for all using (is_admin()) with check (is_admin());

drop policy if exists "quotes insert" on quotes;
create policy "quotes insert" on quotes for insert with check (status = 'new');
drop policy if exists "quotes admin read" on quotes;
create policy "quotes admin read" on quotes for select using (is_admin());
drop policy if exists "quotes admin update" on quotes;
create policy "quotes admin update" on quotes for update using (is_admin());
drop policy if exists "quotes admin delete" on quotes;
create policy "quotes admin delete" on quotes for delete using (is_admin());

drop policy if exists "own profile" on profiles;
create policy "own profile" on profiles for select using (id = auth.uid() or is_admin());

-- PHOTO STORAGE (create the public bucket "stone-images" first, see SETUP.md) ---
drop policy if exists "stone images read" on storage.objects;
create policy "stone images read" on storage.objects for select using (bucket_id = 'stone-images');
drop policy if exists "stone images admin write" on storage.objects;
create policy "stone images admin write" on storage.objects for insert with check (bucket_id = 'stone-images' and is_admin());
drop policy if exists "stone images admin delete" on storage.objects;
create policy "stone images admin delete" on storage.objects for delete using (bucket_id = 'stone-images' and is_admin());
