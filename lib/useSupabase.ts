import { supabaseClient } from "lib/supabaseClient";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

const useSupabase = () => {
  const session = useSession();

  const supabase = useMemo(() => {
    if (!session.data) return null;
    return supabaseClient(session.data.supabaseAccessToken);
  }, [session.data]);

  return supabase;
};

export default useSupabase;
