import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { supabaseClient } from 'lib/supabaseClient';
import { getServerSession } from "next-auth/next"
import env from "lib/env";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { file } = req.body;
  const session = await getServerSession(req, res, authOptions)
  console.log("req body", req.body)
  
  if (!session?.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const supabaseAccessToken = env.supabaseServiceRoleKey
  const userId = session.user.id
  const supabase = supabaseClient(supabaseAccessToken);

  if (req.method === 'POST') {
    const name = `pictures/${userId}/${file.fileName}`
    try {
      const { data, error } = await supabase.storage.from('profile-images').upload(name, file.fileObject, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.fileObject.type,
      })

      if (error) {
        console.error('Error uploading image:', error);
      }
      return res.status(200).json(data);
    } catch (error) {
        console.error('Error updating profile:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase.storage
      .from('profile-images')
      .createSignedUrl('pictures/30fa0955-9073-4b4f-a2fb-725fd561bc05/pup.jpg', 60);

      if (error) {
        console.error('Error uploading image:', error);
      }
     
      return res.status(200).json(data);
    } catch (error) {
      console.error('Error updating profile:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
