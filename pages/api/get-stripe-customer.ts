import { NextApiRequest, NextApiResponse } from 'next';
import {getEmailForUserId} from 'lib/supabaseUtils'
// import { authOptions } from 'pages/api/auth/[...nextauth]'
import { supabaseClient } from 'lib/supabaseClient';
// import { getServerSession } from "next-auth/next"
import env from 'lib/env';



export default async (req: NextApiRequest, res: NextApiResponse) => {
  // const session = await getServerSession(req, res, authOptions)
  const supabaseAccessToken = env.supabaseServiceRoleKey;
  const supabase = supabaseClient(supabaseAccessToken)

  if (req.method === 'GET') {
    try {
      const { data: profileData, error: profileError } = await supabase
        .from('profile')
        .select('user_id, stripe_customer_id, product, first_name, last_name')
        .not('stripe_customer_id', 'is', null); // Filter users with stripe_customer_id

      if (profileError) {
        throw profileError;
      }

      const enrichedUserData = await Promise.all(
        profileData.map(async (user) => {
          const email = await getEmailForUserId(user.user_id, supabaseAccessToken!);
          return {
            user_id: user.user_id,
            stripe_customer_id: user.stripe_customer_id,
            product: user.product,
            name: `${user.first_name} ${user.last_name}`,
            email,
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
