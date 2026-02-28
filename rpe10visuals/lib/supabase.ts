import { createClient } from '@supabase/supabase-js'

type SupabaseLike = {
  from: (table: string) => {
    insert: (rows: unknown) => Promise<unknown>
  }
}

let client: SupabaseLike | undefined

export function getSupabaseClient(): SupabaseLike {
  if (client) return client
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !anon) {
    throw new Error('Supabase env vars are missing')
  }
  client = createClient(url, anon) as unknown as SupabaseLike
  return client
}
