import { NextApiRequest, NextApiResponse } from 'next';
import {getEmailForUserId} from 'lib/supabaseUtils'
import { supabaseClient } from 'lib/supabaseClient';
import env from 'lib/env';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseAccessToken = env.supabaseServiceRoleKey;
  const supabase = supabaseClient(supabaseAccessToken)

  if (req.method === 'GET') {
    try {
      const { data: profileData, error: profileError } = await supabase
        .from('profile')
        .select('*')
        .not('stripe_customer_id', 'is', null); // Filter users with stripe_customer_id

      if (profileError) {
        throw profileError;
      }

      const enrichedUserData = await Promise.all(
        profileData.map(async (user) => {
          const email = await getEmailForUserId(user.user_id, supabaseAccessToken!);
          return {
            ...user,
            email
          };
        })
      );

      res.status(200).json(enrichedUserData);
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
