import { useMemo } from 'react'

import env from 'lib/env'
import { supabaseClient } from 'lib/supabaseClient'
import { useSession } from 'next-auth/react'

const useSupabase = () => {
	const session = useSession()
	const supabaseAccessToken = env.supabaseServiceRoleKey
	const supabase = useMemo(() => {
		if (!session.data) return null

		return supabaseClient(supabaseAccessToken)
	}, [session.data])

	return supabase
}

export default useSupabase
