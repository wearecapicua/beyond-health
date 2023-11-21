import env from "lib/env";
import { supabaseClient } from "lib/supabaseClient";
import { getEmailForUserId, getUserShippingAddress } from 'lib/supabaseUtils';
import { NextApiRequest, NextApiResponse } from 'next';

const test = {
  "to_address": {
      "city": "San Francisco",
      "company": "Shippo",
      "country": "US",
      "email": "shippotle@shippo.com",
      "name": "Mr Hippo",
      "phone": "15553419393",
      "state": "CA",
      "street1": "215 Clayton St.",
      "zip": "94117"
  },
  "line_items": [
      {
          "quantity": 1,
          "sku": "HM-123",
          "title": "Hippo Magazines",
          "total_price": "12.10",
          "currency": "USD",
          "weight": "0.40",
          "weight_unit": "lb",
      }
  ],
  "placed_at": "2016-09-23T01:28:12Z",
  "order_number": "#1068",
  "order_status": "PAID",
  "shipping_cost": "12.83",
  "shipping_cost_currency": "USD",
  "shipping_method": "USPS First Class Package",
  "subtotal_price": "12.10",
  "total_price": "24.93",
  "total_tax": "0.00",
  "currency": "USD",
  "weight": "0.40",
  "weight_unit": "lb"
}
const paymentTimestamp = new Date().toISOString();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const supabaseAccessToken = env.supabaseServiceRoleKey;
  const supabase = supabaseClient(supabaseAccessToken);
  const { userId, setupId } = req.body;

  try {
    const userEmail = await getEmailForUserId(userId, supabaseAccessToken);
    const userShippingAddress = await getUserShippingAddress(userId, supabaseAccessToken);
  
    const shippoApiKey = env.shippoApiKey;
    const shippoApiUrl = 'https://api.goshippo.com/orders';

    const newData = {
        ...test,
        placed_at: paymentTimestamp,
        to_address: {
          ...userShippingAddress,
          email: userEmail,
        },
    }
    console.log({newData})

    const shippoResponse = await fetch(shippoApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `ShippoToken ${shippoApiKey}`,
      },
      body: JSON.stringify(newData),
    });

    const shippoData = await shippoResponse.json();
console.log({shippoData})
    if (shippoResponse.ok) {
      res.status(200).json({ success: true, shippoData });
    } else {
      res.status(shippoResponse.status).json({ success: false, error: shippoData.detail });
    }
  } catch (error) {
    console.error('Error creating shipment:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}
