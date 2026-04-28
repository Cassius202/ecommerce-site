"use server";

import { createClient } from "@/utils/supabase/server";

export async function checkUserAuth() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return { success: false, user: null };
  }

  return { success: true, user };
}