import { supabaseAuthClient } from 'lib/supabaseAuthClient';

export async function getEmailForUserId(userId: string, supabaseAccessToken: string) {
  const supabaseAuth = supabaseAuthClient(supabaseAccessToken);
  try {
    const { data: userData, error: userError } = await supabaseAuth
      .from('users')
      .select('email')
      .eq('id', userId);

    if (userError) {
      throw userError;
    }

    return userData?.[0]?.email;
  } catch (error) {
    console.error('Error querying next_auth.users table:', error);
    throw error;
  }
}
