// lib/supabase.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient | null = null

function getClient(): SupabaseClient {
  if (client) return client

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    throw new Error(
      'Supabase env vars ausentes: defina NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY'
    )
  }

  client = createClient(url, key)
  return client
}

// Proxy que só instancia o cliente quando for realmente usado
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const c = getClient() as any
    const value = c[prop]
    return typeof value === 'function' ? value.bind(c) : value
  },
})