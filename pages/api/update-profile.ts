import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { supabaseClient } from 'lib/supabaseClient';
import { getServerSession } from "next-auth/next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { updatedData } = req.body;
  console.log("uu", updatedData)
  const session = await getServerSession(req, res, authOptions)

  if (!session?.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
 
  const { supabaseAccessToken } = session;
  const userId = session.user.id
  const supabase = supabaseClient(supabaseAccessToken);

  if (req.method === 'PUT') {
    console.log("gg", userId)
    try {
      const { data, error } = await supabase
      .from('profile')
      .update(
        updatedData
      )
      .eq('user_id', userId);

      if (error) {
        throw error;
      }
      console.log("dataa", data)

      return res.status(200).json(data);
    } catch (error) {
      console.error('Error updating profile:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}