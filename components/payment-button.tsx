import React, { useState } from "react";
import StripeTestCards from "./StripeTestCards";
import useStripe from "lib/useStripe";
import { fetchPostJSON } from "lib/http";
import { type PaymentIntentBody } from "pages/api/checkout_sessions/post-payment";
import type Stripe from "stripe";

type Props = {
  setupId: string;
  price: number;
};

const PaymentButton = ({
  setupId,
  price
}: Props) => {
  
  const stripe = useStripe();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string>();
  const priceString = price.toString();
 
  const handlePayment = async () => {
    setLoading(true);
    if (!stripe) {
      console.error("Failed to load Stripe.js");
      return;
    }

    // Create a Checkout Session.
    try {
      const response = await fetchPostJSON<
        PaymentIntentBody,
        Stripe.Checkout.Session
      >(`/api/checkout_sessions/post-payment`, {
        method: 'POST',
        setupId,
        price
      })
      /* @ts-ignore */
      console.log(response.status)
      setResults(response?.status)
      setLoading(false);
      
    } catch (error) {
      console.error("Error", error);
    }
  }

  return (
    <div>
      {!results ?
        <button onClick={handlePayment} disabled={loading}>
          {`Submit payment for ${priceString}`}
        </button>
      :
        <p>Payment status: {results}</p>
      }
    </div>
  );
};

export default PaymentButton;