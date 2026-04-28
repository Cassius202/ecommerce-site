import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderEmail({
  user,
  reference,
  items,
}: {
  user: { name?: string | null; email: string };
  reference: string;
  items: { name: string; quantity: number }[];
}) {
  const invoiceUrl = `${process.env.NEXT_PUBLIC_APP_URL}/invoice/${reference}`;

  const itemsList = items
    .map((item) => `• ${item.name} x${item.quantity}`)
    .join("\n");

  await resend.emails.send({
    from: "Cassius Stores <orders@yourdomain.com>",
    to: user.email,
    subject: `Order Confirmed - ${reference}`,
    html: `
  <div style="font-family: sans-serif">
    <h2>Your order is confirmed 🎉</h2>

    <p>Hi ${user.name || "there"},</p>

    <p><b>Reference:</b> ${reference}</p>

    <p><b>Items:</b></p>
    <ul>
      ${items.map((i) => `<li>${i.name} x${i.quantity}</li>`).join("")}
    </ul>

    <a href="${invoiceUrl}" style="
      display:inline-block;
      padding:10px 15px;
      background:#000;
      color:#fff;
      text-decoration:none;
      border-radius:6px;
    ">
      View Invoice
    </a>
  </div>
`,
  });
}
