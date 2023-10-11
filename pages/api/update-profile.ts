import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { supabaseClient } from 'lib/supabaseClient';
import { getServerSession } from "next-auth/next"
import env from 'lib/env';

// async function assignUserRole(
//   supabase: SupabaseClient,
//   userId: string,
//   roleName: string
// ): Promise<any> {
//   try {
//     // Update the user's role in the database
//     const { data, error } = await supabase
//       .from('users')
//       .update({ role: roleName })
//       .eq('id', userId);

//     if (error) {
//       throw error;
//     }

//     return data;
//   } catch (error) {
//     console.error('Error assigning role:', error);
//     throw error;
//   }
// }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { updatedData } = req.body;

  const session = await getServerSession(req, res, authOptions)

  if (!session?.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const userId = session.user.id
  const supabaseAccessToken = env.supabaseServiceRoleKey;
  const supabase = supabaseClient(supabaseAccessToken)

  if (req.method === 'PUT') {
    try {
      const { data, error } = await supabase
        .from('profile')
        .update(updatedData)
        .eq('user_id', userId);

      if (error) {
        throw error;
      }

      return res.status(200).json(true)
    } catch (error) {
      console.error('Error updating profile:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    try {
      const { data, error } = await supabase
        .from('profile')
        .upsert([
          {
            user_id: userId,
            ...updatedData
          },
        ]);

      if (error) {
        throw error;
      }

      // Assign the user's role after successfully updating the profile
      // await assignUserRole(supabase, userId, 'CUSTOMER');

      return res.status(200).json(true);
    } catch (error) {
      console.error('Error creating profile:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
