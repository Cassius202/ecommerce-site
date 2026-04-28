import { NextResponse } from "next/server";
import { VerifyPaymentResponse } from "@/constants/types.payment";
import { checkUserAuth } from "@/utils/actions/auth.actions";
import { crossreference } from "@/utils/actions/payment.crossreference";
import { updatePaymentStatus } from "@/utils/actions/payment.actions";
import { getUserById } from "@/app/account/actions";
import { UserDetails } from "@/constants/assets";
import { clientEmail } from "@/utils/actions/email.actions";


export type PaymentStatus = "pending" | "success" | "failed";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ reference: string }> }
) {
  /**params is coming from the request URL/api */
  const { reference } = await params;
  const { success, user } = await checkUserAuth();

  if (!success || !user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "ngrok-skip-browser-warning": "true",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to verify payment" },
        { status: response.status }
      );
    }

    const data = (await response.json()) as VerifyPaymentResponse;

    // ❗ 3. Basic paystack payment validation
    if (!data.status || data.data.status !== "success") {
      await updatePaymentStatus(reference, 'failed');
      return NextResponse.json(
        { error: "Payment not successful" },
        { status: 400 }
      );
    }
    // email check
    if (data.data.customer.email !== user.email) {
      await updatePaymentStatus(reference, 'failed');
      return NextResponse.json(
        { error: "Email mismatch" },
        { status: 400 }
      );
    }

    const crossReferenceResult = await crossreference(
      reference,
      data.data.amount,
      data.data.customer.email
    );

    const finalStatus: PaymentStatus = crossReferenceResult.success ? 'success' : 'failed';

    await updatePaymentStatus(reference, finalStatus);

    if (!crossReferenceResult.success) {
      return NextResponse.json(
        { error: crossReferenceResult.message },
        { status: 400 }
      );
    }

    //client side success email

    if (!user) {
      console.error("User not found - so personalized email can't be sent");
    }
    const cleanReference = reference?.replace("/", "");
    
    await clientEmail(user.id, cleanReference, user.email);

    return NextResponse.json(
      {
        success: true,
        data: data.data,
        message: "Payment verified successfully",
        paystackAmount: data.data.amount
      }
    );
    //end of updating payment status

  } catch (error) {
    console.error("Payment verification error:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};



