"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: { email: string; message: string }) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Cassius Store <business@cassiusdev.online>",
      to: ["business@cassiusdev.online"], 
      subject: `New Inquiry from ${formData.email}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #09090b; margin: 0; padding: 0; }
              .container { max-width: 600px; margin: 20px auto; background-color: #18181b; border: 1px solid #27272a; border-radius: 12px; overflow: hidden; }
              .header { background-color: #fbbf24; padding: 20px; text-align: center; }
              .header h1 { margin: 0; color: #000000; font-size: 20px; text-transform: uppercase; letter-spacing: 2px; }
              .content { padding: 30px; color: #e4e4e7; line-height: 1.6; }
              .label { color: #71717a; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; margin-bottom: 4px; }
              .value { color: #fafafa; font-size: 16px; margin-bottom: 24px; }
              .message-box { background-color: #27272a; padding: 20px; border-radius: 8px; border-left: 4px solid #fbbf24; color: #d4d4d8; }
              .footer { padding: 20px; text-align: center; font-size: 12px; color: #52525b; border-top: 1px solid #27272a; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Cassius Store Admin</h1>
              </div>
              <div class="content">
                <div class="label">Customer Email</div>
                <div class="value">${formData.email}</div>
                
                <div class="label">Message Details</div>
                <div class="message-box">
                  ${formData.message.replace(/\n/g, '<br>')}
                </div>
              </div>
              <div class="footer">
                &copy; ${new Date().getFullYear()} Cassius Store | Lagos, Nigeria
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) return { success: false, error };
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}