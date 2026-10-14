
-- Run this in Supabase SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 80),
  email text not null check (char_length(email) <= 254),
  company text,
  service text not null,
  message text not null check (char_length(message) between 10 and 3000),
  status text not null default 'new'
    check (status in ('new', 'contacted', 'qualified', 'closed')),
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

-- No anon/authenticated policies are created intentionally.
-- Public writes happen only through the server API using the service-role key.
-- The service-role key bypasses RLS and must NEVER be exposed to browser code.
-- Restrict dashboard access in application code and keep the table private.