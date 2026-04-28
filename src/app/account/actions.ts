'use server'

import { UserDetails } from "@/constants/assets";
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

export async function getUserByEmail(email: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("store_users")
    .select("*")
    .eq("email", email)
    .single();

  if (error) {
    console.error("Database fetch error:", error.message);
    return null;
  }

  const userDetails: UserDetails = {
    full_name: data?.full_name,
    username: data?.username,
    avatar_url: data?.avatar_url,
    email: data?.email,
    phone_number: data?.phone_number,
  };

  return { success: true, user: userDetails };
}

export async function getUserById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("store_users")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Database fetch error:", error.message);
    return null;
  }

  const userDetails: UserDetails = {
    full_name: data?.full_name,
    username: data?.username,
    avatar_url: data?.avatar_url,
    email: data?.email,
    phone_number: data?.phone_number,
  };

  return { success: true, user: userDetails };
}