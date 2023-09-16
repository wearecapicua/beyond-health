import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { supabaseClient } from 'lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session?.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const { supabaseAccessToken } = session;
  const userId = session.user.id
  const supabase = supabaseClient(supabaseAccessToken);

  try {
    const { data, error } = await supabase
      .from('profile')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
