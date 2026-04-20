"use server"

import { createClient } from "../supabase/server"

export interface HeaderProfile {
  full_name: string | null;
  username: string | null;
  avatar_url: string | null;
  email: string;
}

export async function getHeaderProfile(): Promise<HeaderProfile | null> {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from('store_users')
    .select('full_name, username, avatar_url')
    .eq('id', user.id)
    .maybeSingle()

  // Use ?? to provide fallbacks so TypeScript is 100% sure these are strings
  return {
    full_name: profile?.full_name ?? null,
    username: profile?.username ?? null,
    avatar_url: profile?.avatar_url ?? null,
    email: user.email ?? "", 
  }
}