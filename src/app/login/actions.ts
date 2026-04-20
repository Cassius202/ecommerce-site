'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData, redirectTo: string = "/") {
  const supabase = await createClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { error: error.message } 
  }

  // Success! Revalidate and redirect
  revalidatePath('/', 'layout')
  redirect(redirectTo)
}

export async function signOut() {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error("Sign out error:", error.message)
  }
  revalidatePath('/', 'layout')
  // 3. Redirect to the home page
  redirect('/')
}