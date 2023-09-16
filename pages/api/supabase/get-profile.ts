import { NextApiRequest, NextApiResponse } from 'next';
import { useSession } from 'next-auth/react';
import { createClient } from '@supabase/supabase-js';

import env from "lib/env";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("req", req.body)
  
  

  try {
   

      return res.status(200).json({});
  } catch (error) {
    console.error('Error fetching profile:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
// 2:19