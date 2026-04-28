'use server'

import { createClient } from "@/utils/supabase/server";
import { checkUserAuth } from "./auth.actions"; // Assuming your paths
import { getProductById } from "./product.action";
import { Payment } from "@/constants/types.paymentdatabase";

export interface CheckoutItem {
  id: string; // Adjusted to string as per common UUID usage
  quantity: number;
}

export async function initializePayment(reference: string, items: CheckoutItem | CheckoutItem[], addressId: string) {
  const supabase = await createClient();

  reference = reference.trim().replace(/\/$/, "");

  const itemsArray = Array.isArray(items) ? items : [items];

  const { user } = await checkUserAuth();

  let totalKobo = 0;
  const productSnapshots = [];

  // 3. Use your helper to securely fetch product data
  let baseFee = 0;

  for (const item of itemsArray) {
    const product = await getProductById(item.id);

    if (!product) {
      throw new Error(`Product with ID ${item.id} not found.`);
    }

    const shipping = Math.round((product.product_shipping_fee || 0) * 100);

    baseFee = Math.max(baseFee, shipping);

    const itemPriceKobo = Math.round(product.price * 100);
    totalKobo += itemPriceKobo * item.quantity;

    productSnapshots.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: item.quantity
    });
  }

  const extraItems = Math.max(0, itemsArray.length - 1);
  const deliveryFeeKobo = baseFee + extraItems * 20 * 100; // ₦200 per extra item
  // 4. Create the record in Supabase
  const { error } = await supabase.from('payments').insert({
    reference,
    address_id: addressId,
    user_id: user?.id || null,
    email: user?.email || null,
    amount: totalKobo,
    delivery_fee: deliveryFeeKobo,
    metadata: {
      type: Array.isArray(items) ? 'cart' : 'buy_now',
      items: productSnapshots
    },
    status: 'pending'
  });

  if (error) {
    console.error("Supabase Insert Error:", error.message);
    throw new Error("Failed to create transaction record.");
  }

  return { success: true, amountKobo: totalKobo };
}


export async function getPaymentByReference(reference: string) {
  const supabase = await createClient();

  reference = reference.trim().replace(/\/$/, "");

  const { data, error } = await supabase.from('payments').select("*").eq('reference', reference).maybeSingle();

  if (error) {
    console.error("Supabase Fetch Error:", error.message);
    throw new Error("Failed to fetch payment record.");
  }
  if (!data) {
    console.error("No payment found for reference:", reference);
    return null;
  }
  return data as Payment;
}

export async function updatePaymentStatus(reference: string, status: 'success' | 'failed') {
  const supabase = await createClient();

  reference = reference.trim().replace(/\/$/, "");

  const { data, error } = await supabase
    .from('payments')
    .update({
      status,
      updated_at: new Date().toISOString()
    })
    .eq('reference', reference)
    .eq('status', 'pending')
    .select()
    .single();

  if (error) {
    console.error("Payment Update Failed (DB error):", error.message);

    return {
      success: false,
      message: "Database error while updating payment."
    };
  }

  if (!data) {
    return {
      success: false,
      message: "Payment already processed or not found."
    };
  }

  return { success: true, data };
}