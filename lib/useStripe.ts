import { type Stripe, loadStripe } from "@stripe/stripe-js";
import env from "lib/env";
import { useEffect, useState } from "react";

const useStripe = () => {
  const [stripe, setStripe] = useState<Stripe | null>(null);
  useEffect(() => {
    const init = async () => {
      const loadedStripe = await loadStripe(env.stripePublicKey);
      setStripe(loadedStripe);
    };
    init();
  }, []);
  return stripe;
};

export default useStripe;
