import { createClient } from '@supabase/supabase-js';

export const supabaseAuthClient = (supabaseAccessToken: string | undefined) => {

  return createClient(
    /* @ts-ignore */
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      db: {
        schema: 'next_auth'
      },
      global: {
        headers: {
          Authorization: `Bearer ${supabaseAccessToken}`,
        },
      },
    }
  )
}