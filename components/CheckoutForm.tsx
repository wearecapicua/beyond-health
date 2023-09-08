import React, { useState } from "react";
import StripeTestCards from "./StripeTestCards";
import useStripe from "lib/useStripe";
import { fetchPostJSON } from "lib/http";
import { type CheckoutSessionBody } from "pages/api/checkout_sessions";
import type Stripe from "stripe";

type Props = {
  productId: string;
};

const CheckoutForm = ({ productId }: Props) => {
  
  const stripe = useStripe();
  const [loading, setLoading] = useState(false);
 
  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!stripe) {
      console.error("Failed to load Stripe.js");
      return;
    }

    // Create a Checkout Session.
    const response = await fetchPostJSON<
      CheckoutSessionBody,
      Stripe.Checkout.Session
    >("/api/checkout_sessions", {
      productId: productId,
    });

    // Redirect to Checkout.
    const { error } = await stripe.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: response.id,
    });
    console.error({ error });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message);
    setLoading(false);
  };

  return (
    <div >
      {/* {<StripeTestCards />} */}
      <button onClick={handleCheckout} disabled={loading}>
        Buy
      </button>
    </div>
  );
};

export default CheckoutForm;
