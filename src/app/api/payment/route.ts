import { NextResponse } from "next/server";
import { PaystackResponse } from "@/constants/assets";
export async function POST(request: Request) {
  try {
    const { email, amount } = await request.json();

    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        amount: Math.round(amount * 100), //in kobo
      })
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to initialize paystack transaction' },
        { status: response.status }
      )
    }

    const resultObject : object = {
      status: "success", url: result.data.authorization_url,
      access_code: result.data.access_code,
      reference: result.data.reference
    }


    return NextResponse.json(resultObject);

  } catch (error) {
    console.log('Payment api error: ', error);
    return NextResponse.json({ error: 'Internal Service Error (payment)' }, { status: 500 });
  } finally {
    console.log('Payment API Request Processed')
  }
}