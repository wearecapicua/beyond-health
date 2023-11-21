import { supabaseAuthClient } from 'lib/supabaseAuthClient';
import { supabaseClient } from 'lib/supabaseClient';

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


export async function getUserShippingAddress(userId: string, supabaseAccessToken: string) {
  const supabase = supabaseClient(supabaseAccessToken);

  const { data: userProfile, error } = await supabase
    .from('profile')
    .select('shipping_address,first_name,last_name,country,phone_number')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching user profile:', error);
    throw new Error('Error fetching user profile');
  }

  const { shipping_address, first_name, last_name, country, phone_number } = userProfile;

  const formattedAddress = {
    street1: shipping_address?.line1,
    street2: shipping_address?.line2,
    city: shipping_address?.city,
    state: shipping_address?.state,
    zip: shipping_address?.postal_code,
    company: "none",
    name: `${first_name} ${last_name}`,
    country: country || 'CA',
    phone: phone_number
  };
  return formattedAddress || {};
}
