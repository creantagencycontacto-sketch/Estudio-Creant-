-- ============================================================
-- TABLA DE LEADS DE LA WEB DE CREANT
-- ============================================================
--
-- Guarda cada consulta que entra por el formulario de contacto,
-- junto con el origen de la visita (de qué campaña o anuncio vino).
--
-- CÓMO EJECUTARLO:
--   1. Entrá a supabase.com y abrí el proyecto de Creant
--   2. En el menú de la izquierda: "SQL Editor"
--   3. Pegá todo este archivo y tocá "Run"
--
-- Se puede correr más de una vez sin romper nada.
-- ============================================================

create table if not exists public.leads (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),

  -- Lo que completa la persona en el formulario
  name         text not null,
  email        text not null,
  message      text not null,

  -- De dónde vino: sirve para saber qué anuncio trae consultas de verdad
  utm_source   text,
  utm_medium   text,
  utm_campaign text,
  utm_content  text,
  fbclid       text,
  referrer     text,
  landing_page text
);

-- Para que la lista salga ordenada por fecha sin ponerse lenta.
create index if not exists leads_created_at_idx
  on public.leads (created_at desc);


-- ============================================================
-- SEGURIDAD (esta parte es la importante)
-- ============================================================
--
-- Row Level Security = "nadie toca nada salvo lo que permitamos".
--
-- Sin esto, como la clave de la web es pública (viaja en el navegador de
-- cualquiera que entre), cualquier persona podría descargarse la lista
-- completa de tus contactos: nombres, mails y consultas.
--
-- Con las reglas de abajo:
--   ✅ La web puede AGREGAR un lead nuevo (lo que necesita el formulario)
--   ❌ Nadie puede LEER, MODIFICAR ni BORRAR desde afuera
--
-- Vos sí los ves, entrando a Supabase con tu usuario (Table Editor → leads).
-- ============================================================

alter table public.leads enable row level security;

-- Permiso de escritura: cualquiera puede dejar una consulta.
drop policy if exists "La web puede cargar leads" on public.leads;
create policy "La web puede cargar leads"
  on public.leads
  for insert
  to anon, authenticated
  with check (true);

-- Ojo: NO creamos ninguna política de SELECT, UPDATE ni DELETE.
-- Al no existir, Postgres las bloquea por defecto. Eso es lo que queremos.

-- Además le sacamos el permiso de lectura a nivel de tabla, por las dudas.
revoke select, update, delete on public.leads from anon, authenticated;
grant insert on public.leads to anon, authenticated;


-- ============================================================
-- PARA VER TUS LEADS
-- ============================================================
--
-- Opción fácil: Supabase → Table Editor → tabla "leads"
--
-- Opción con filtro, pegando esto en el SQL Editor:
--
--   select created_at, name, email, message, utm_source, utm_campaign
--   from public.leads
--   order by created_at desc;
-- ============================================================
