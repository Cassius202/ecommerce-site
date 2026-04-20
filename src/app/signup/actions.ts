'use server'

import { createClient } from '@/utils/supabase/server'
// import { redirect } from 'next/navigation'

export async function startSignup(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // PRO TIP: Change this to a dynamic environment variable for production
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/confirm`,
    },
  })

  if (error) {
    return { error: error.message }
  }
  
  return { success: true, email } 
}

export async function verifyOTP(email: string, token: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: 'email', // Changed to 'email' for better reliability
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export type CheckEmailResult = {
  exists: boolean;
  error: string | null;
};

export async function checkExistingEmail(email: string): Promise<CheckEmailResult> {
  if (!email || typeof email !== 'string') {
    return { exists: false, error: "Invalid email provided" };
  }

  const normalizedEmail = email.trim().toLowerCase();

  try {
    const supabase = await createClient();

    // 3. Optimization: Fetch only 'id' to reduce payload, or use a HEAD request
    const { data, error } = await supabase
      .from('store_users')
      .select('id') // We only need to know if a row exists, no need to fetch the email string back
      .eq('email', normalizedEmail)
      .maybeSingle(); 

    if (error) {
      console.error("Database error checking email:", error.message);
      return { exists: false, error: "Failed to verify email address" };
    }

    // 4. Consistent return format
    return { exists: !!data, error: null };

  } catch (err) {
    // 5. Catch unexpected execution errors (e.g., createClient failing, network down)
    console.error("Unexpected error in checkExistingEmail:", err);
    return { exists: false, error: "An unexpected error occurred" };
  }
}