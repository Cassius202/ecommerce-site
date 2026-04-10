"use server"

import { createClient } from "@/utils/supabase/server";

export async function fetchProducts() {
  
  const supabase = await createClient();
  try {
    const {data: products, error} = await supabase.from("products").select('*').order('created_at', { ascending: false });
    if (error) {
      console.error("Supabase Error:", error.message);
      return [];
    }
    return products;
  } catch(err) {
    console.error(err);
    return [];
  }
}

export async function getProductById(id: string) {
  const supabase = await createClient();
  try {
    const {data: product, error} = await supabase.from("products").select('*').eq('id', id).single();
    if (error) {
      console.error("Supabase Error:", error.message);
      return null;
    }
    return product;
  } catch(err) {
    console.error(err);
    return null;
  }
}
