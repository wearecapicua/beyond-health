import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { supabaseClient } from 'lib/supabaseClient';
import { getServerSession } from "next-auth/next"
import env from "lib/env";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)
  
  if (!session?.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const supabaseAccessToken = env.supabaseServiceRoleKey
  const userId = session.user.id
  const supabase = supabaseClient(supabaseAccessToken);

  if (req.method === 'GET') {
    try {
      const { data: healthCardImage, error } = await supabase
      .from('profile')
      .select('health_card_image_url')
      .eq('user_id', userId)
      .neq('health_card_image_url', null)
      .single()

      if (healthCardImage) {
        const { data } = await supabase.storage
        .from('profile-images')
        .getPublicUrl(healthCardImage.health_card_image_url)

        return res.status(200).json(data);
      } else {
        return res.status(200).json(null);
      }

    } catch (error) {
      console.error('Error getting helthd card image:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
