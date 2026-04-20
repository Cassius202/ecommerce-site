'use server'

import { createClient } from "@/utils/supabase/server"

export async function getUserDetails() {
  const supabase = await createClient()
  
  // 1. First, verify the Auth session
  const { data: { user }, error: authError } = await supabase.auth.getUser(); 

  if (authError || !user) {
    // Instead of throwing a generic error, we return null so the UI 
    // can redirect the user to login gracefully.
    return null;
  }

  const { data: profile, error: dbError } = await supabase
    .from('store_users')
    .select('*')
    .eq('id', user.id)
    .single();

  if (dbError) {
    console.error("Database fetch error:", dbError.message);
    return null;
  }

  return profile;
}