"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export interface Address {
  id: string;
  user_id: string;          
  label: string;           
  full_name: string;
  phone_number: string;
  street_address: string;
  city: string;
  state: string;
  postal_code: string | null;
  is_default: boolean;
  created_at: string;    
}

export type AddressDTO = Omit<Address, 'id' | 'user_id' | 'created_at'>;

export type UpdateAddressDTO = Partial<AddressDTO> & { id: string };


export async function getAddresses() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Authentication required");

  const { data, error } = await supabase
    .from("addresses")
    .select("*")
    .eq("user_id", user.id)
    .order("is_default", { ascending: false }) // Default address comes first
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

// 2. Create a new address (The DB Trigger handles the limit of 4)
export async function createAddress(formData: AddressDTO) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authorized");

  // Check if this is the user's first address. If so, make it default.
  const { count } = await supabase
    .from("addresses")
    .select("*", { count: 'exact', head: true })
    .eq("user_id", user.id);

  const isFirstAddress = count === 0;

  const { data, error } = await supabase
    .from("addresses")
    .insert([
      { 
        ...formData, 
        user_id: user.id, 
        is_default: isFirstAddress || formData.is_default 
      },
    ])
    .select()
    .single();

  if (error) {
    // This catches the 'You can only save up to 4' error from our SQL Trigger
    throw new Error(error.message);
  }

  revalidatePath("/checkout");
  return data;
}

// 3. Update default address
export async function setDefaultAddress(addressId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authorized");

  // Our SQL trigger 'ensure_single_default' handles unsetting other defaults
  const { error } = await supabase
    .from("addresses")
    .update({ is_default: true })
    .eq("id", addressId)
    .eq("user_id", user.id); // Security: ensure user owns the address

  if (error) throw new Error(error.message);

  revalidatePath("/checkout");
}

// 4. Delete Address
export async function deleteAddress(addressId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authorized");

  const { error } = await supabase
    .from("addresses")
    .delete()
    .eq("id", addressId)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);

  revalidatePath("/checkout");
}