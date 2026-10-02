-- Run only in the site's Supabase project (aeglehibpdsirsrjrjmg).
-- Additive setup; no existing notes, users or billing tables are changed.
begin;
create table if not exists public.learning_entries (
  user_id uuid not null references auth.users(id) on delete cascade,
  entry_key text not null check (length(entry_key) <= 160),
  counter bigint not null check (counter between 1 and 9007199254740991),
  device uuid not null,
  value jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, entry_key)
);
alter table public.learning_entries enable row level security;
revoke all on public.learning_entries from anon, authenticated;
grant select, insert, update on public.learning_entries to authenticated;
drop policy if exists learning_select_own on public.learning_entries;
create policy learning_select_own on public.learning_entries for select to authenticated using ((select auth.uid()) = user_id);
drop policy if exists learning_insert_own on public.learning_entries;
create policy learning_insert_own on public.learning_entries for insert to authenticated with check ((select auth.uid()) = user_id);
drop policy if exists learning_update_own on public.learning_entries;
create policy learning_update_own on public.learning_entries for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create or replace function public.sync_learning_entries(entries jsonb)
returns setof public.learning_entries language plpgsql security invoker set search_path = '' as $$
declare item jsonb; owner_id uuid := auth.uid();
begin
  if owner_id is null then raise exception 'Authentication required' using errcode = '42501'; end if;
  if jsonb_typeof(entries) is distinct from 'array' or jsonb_array_length(entries) > 100 then raise exception 'Invalid batch'; end if;
  for item in select * from jsonb_array_elements(entries) loop
    if jsonb_typeof(item) is distinct from 'object'
       or (item->>'entry_key') is null
       or (item->>'entry_key') !~ '^(lecture:|quiz:|attempt:|case:|tsubo:|settings:)[A-Za-z0-9_:/-]{1,140}$|^(reset|last-visit)$'
       or not (item ? 'value') or octet_length((item->'value')::text) > 16000
       or jsonb_typeof(item->'counter') is distinct from 'number'
       or (item->>'counter') !~ '^[0-9]+$'
       or (item->>'counter')::numeric not between 1 and 9007199254740991
       or (item->>'device') is null then raise exception 'Invalid learning entry'; end if;
    insert into public.learning_entries(user_id, entry_key, counter, device, value)
      values(owner_id, item->>'entry_key', (item->>'counter')::bigint, (item->>'device')::uuid, item->'value')
      on conflict (user_id, entry_key) do update set counter = excluded.counter, device = excluded.device, value = excluded.value, updated_at = now()
      where (excluded.counter, excluded.device::text) > (learning_entries.counter, learning_entries.device::text);
  end loop;
  return query select * from public.learning_entries where user_id = owner_id and entry_key in (select value->>'entry_key' from jsonb_array_elements(entries));
end;
$$;
revoke all on function public.sync_learning_entries(jsonb) from public, anon;
grant execute on function public.sync_learning_entries(jsonb) to authenticated;
commit;
