import { createClient } from '@supabase/supabase-js';

export const supabaseClient = (supabaseAccessToken: string | undefined) => {

  return createClient(
    /* @ts-ignore */
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      global: {
        headers: {
          Authorization: `Bearer ${supabaseAccessToken}`,
        },
      },
    }
  )
}