export async function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !anon) {
    throw new Error('Supabase env vars are missing')
  }
  const { createClient } = await import('@supabase/supabase-js')
  return createClient(url, anon)
}
