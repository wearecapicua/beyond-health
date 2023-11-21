import React, { useState } from "react";
import useStripe from "lib/useStripe";
import { fetchPostJSON } from "lib/http";
import { type PaymentIntentBody } from "pages/api/checkout_sessions/post-payment";
import type Stripe from "stripe";
import { adminUpdatePayments, createOrder } from "lib/api/supabase";

type Props = {
  setupId: string;
  price: number;
  userId: string
  product: any;
};

interface CreateOrderResponse {
  success: boolean;
  shippoData?: {
    order_number: string;
  };
}

const PaymentButton = ({
  setupId,
  price,
  userId,
  product
}: Props) => {
  
  const stripe = useStripe();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string | null>();
  const priceString = (price / 100).toFixed(2).toString();
  const productId = product.id || "prod_OXaDW7p5UyyWnX"
 
  const handlePayment = async () => {
    setLoading(true);
    if (!stripe) {
      console.error("Failed to load Stripe.js");
      return;
    }

    
  try {
    const response = await fetchPostJSON<PaymentIntentBody, Stripe.Checkout.Session>(
      `/api/checkout_sessions/post-payment`,
      {
        method: 'POST',
        setupId,
        price
      }
    );

    setResults(response?.status);
    /* @ts-ignore */
    if (response?.status === "succeeded") {
      /* @ts-ignore */
      const orderResponse: CreateOrderResponse = await createOrder(userId, productId)
      if (orderResponse?.success) {
        await adminUpdatePayments(userId, orderResponse.shippoData?.order_number || "#");
      } else {
        await adminUpdatePayments(userId, "#00000");
      }
    } else {
      await adminUpdatePayments(userId, "#00000");
    }

    setLoading(false);
  } catch (error) {
    console.error("Error", error);
  }
};

  return (
    <div className="text-sm text-main-blue">
      {!results ?
        <button onClick={handlePayment} disabled={loading} className={loading ? "text-gray-500" : ""}>
          <p>Submit payment for </p>
          <span>{`$${priceString}`}</span>
        </button>
      :
        <div className="text-center">
          <p>Payment status:</p>
          <span>{results}</span>
        </div>
      }
    </div>
  );
};

export default PaymentButton;