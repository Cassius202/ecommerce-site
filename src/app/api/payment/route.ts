import { NextResponse } from "next/server";
import { PaystackResponse } from "@/constants/assets";
import { CheckoutItem, initializePayment } from "@/utils/actions/payment.actions";

export async function POST(request: Request) {
  try {
    const { email, amount, productID, quantity, addressID} = await request.json();

    const item : CheckoutItem= {
      id: productID,
      quantity: quantity,
    }

    if (!item) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        amount: Math.round(amount * 100), //in kobo
        callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/verifying-payment`
      })
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to initialize paystack transaction' },
        { status: response.status }
      )
    }

   //insert this payment record to the database
    const paymentdbResult = await initializePayment(result.data.reference, item, addressID)

    if (!paymentdbResult.success) {
      return NextResponse.json({ error: 'Database synchronization failed' }, { status: 500 });
    }

    //the result going to the frontend
    const resultObject : PaystackResponse = {
      status: "success", url: result.data.authorization_url,
      access_code: result.data.access_code,
      reference: result.data.reference
    }
    return NextResponse.json(resultObject);

  } catch (error) {
    console.log('Payment api error: ', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    console.log('Payment API Request Processed')
  }
}