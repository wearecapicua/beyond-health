import { NextApiRequest, NextApiResponse } from 'next'
import { supabaseClient } from 'lib/supabaseClient'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)
  const userId = session?.user.id
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }
  const { supabaseAccessToken } = session;
  const supabase = supabaseClient(supabaseAccessToken)

  try {
    const { data, error } = await supabase
      .from('profile')
      .select('form_step')
      .eq('user_id', userId)
      .single()

    if (error) {
      console.error('Error querying user profile:', error);
      return res.status(500).json(false);
    }

    if (!data) {
      return res.status(404).json(false);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Error querying user profile:', error);
    return res.status(500).json(false);
  }
}
