import { useSession } from 'next-auth/react';
import { createClient } from '@supabase/supabase-js';
import env from "lib/env";

export const supabaseClient = (supabaseAccessToken) => {
 
  //const userId = session?.user.id
  /* @ts-ignore */
 

  return createClient(
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