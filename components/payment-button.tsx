import React, { useState } from "react";
import StripeTestCards from "./StripeTestCards";
import useStripe from "lib/useStripe";
import { fetchPostJSON } from "lib/http";
import { type PaymentIntentBody } from "pages/api/checkout_sessions/post-payment";
import type Stripe from "stripe";

type Props = {
  setupId: string;
  price: string;
};

const PaymentButton = ({
  setupId,
  price
}: Props) => {
  
  const stripe = useStripe();
  const [loading, setLoading] = useState(false);
 
  const handlePayment = async () => {
    setLoading(true);
    if (!stripe) {
      console.error("Failed to load Stripe.js");
      return;
    }

    // Create a Checkout Session.
    
    const response = await fetchPostJSON<
      PaymentIntentBody,
      Stripe.Checkout.Session
    >(`/api/checkout_sessions/post-payment`, {
      setupId
    })
    console.log("response", response)
    setLoading(false);
  };

  return (
    <div >
      <button onClick={handlePayment} disabled={loading}>
        {`Submit payment for ${price}`}
      </button>
    </div>
  );
};

export default PaymentButton;