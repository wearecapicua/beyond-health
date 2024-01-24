import { createClient } from '@supabase/supabase-js'

export const supabaseAuthClient = (supabaseAccessToken: string | undefined) => {
	return createClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL as string,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
		{
			db: {
				schema: 'next_auth'
			},
			global: {
				headers: {
					Authorization: `Bearer ${supabaseAccessToken}`
				}
			},
			auth: { persistSession: false }
		}
	)
}
