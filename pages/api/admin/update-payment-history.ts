import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { supabaseClient } from 'lib/supabaseClient';
import { getServerSession } from "next-auth/next"
import env from 'lib/env';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.body;

  const session = await getServerSession(req, res, authOptions)
  /* @ts-ignore */
  if (session?.user?.role !== "ADMIN") {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const supabaseAccessToken = env.supabaseServiceRoleKey;

  const supabase = supabaseClient(supabaseAccessToken)

  const paymentTimestamp = new Date().toISOString();

  if (req.method === 'POST') {
    try {
      // Fetch the current payment history array
      const { data, error } = await supabase
        .from('profile')
        .select('payments_history')
        .eq('user_id', userId)
        .single();
  
      if (error) {
        throw error;
      }
  
      // Extract the current payment history array
      const currentPaymentHistory = data.payments_history || [];
  
      // Add the new payment text to the array
      currentPaymentHistory.push(paymentTimestamp);
  
      // Update the profile with the new payment history
      const { error: updateError } = await supabase
        .from('profile')
        .update({ payments_history: currentPaymentHistory })
        .eq('user_id', userId);
  
      if (updateError) {
        throw updateError;
      }
  
      console.log('Payment added to history successfully.');
    } catch (error: any) {
      console.error('Error adding payment to history:', error.message);
    }
  } 
}
