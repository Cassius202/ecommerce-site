'use server'
import { getUserById } from "@/app/account/actions";
import { getPaymentByReference } from "./payment.actions";
import { Payment } from "@/constants/types.paymentdatabase";
import { UserDetails } from "@/constants/assets";
import { sendOrderEmail } from "@/minor-components/sendOrderEmail";

export interface OrderEmailContent {
  user: { name?: string | null; email: string };
  reference: string;
  items: { name: string; quantity: number }[];
}

export async function clientEmail(userId: string, reference: string, email: string) {
  const userDetails: { user: UserDetails, success: boolean } | null = await getUserById(userId);

  if (!userDetails?.success || !userDetails) {
    console.error("User fetch error");
    return { success: false, message: "User fetch error" };
  }

  const paymentData: Payment | null = await getPaymentByReference(reference);

  if (!paymentData) {
    console.error("Payment fetch error");
    return { success: false, message: "Payment fetch error" };
  }

  const emailContent: OrderEmailContent = {
    user: {
      name: userDetails.user.full_name ?? email.split("@")[0],
      email: email,
    },
    reference: reference,
    items: paymentData.metadata.items,
  }

  await sendOrderEmail(emailContent);

  return { success: true, message: "Email sent successfully" };
}