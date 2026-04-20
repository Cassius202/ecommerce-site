import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { User, Package, Settings } from 'lucide-react'
import Link from 'next/link'

export default async function AccountPage() {
  const supabase = await createClient()

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold uppercase tracking-tight">My Account</h1>
          <p className="text-zinc-500">Welcome back, {user.email}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Link href="/account/edit" className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl cursor-pointer">
            <User className="text-amber-500 mb-4" />
            <h2 className="font-bold mb-1">Profile</h2>
            <p className="text-sm text-zinc-500 mb-4">Manage your personal details</p>
            <button className="text-xs font-bold text-amber-500 uppercase tracking-widest hover:text-amber-400">Edit Info</button>
          </Link>

          {/* Orders Card */}
          <Link href="/account/orders" className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
            <Package className="text-amber-500 mb-4" />
            <h2 className="font-bold mb-1">Orders</h2>
            <p className="text-sm text-zinc-500 mb-4">View your purchase history</p>
            <button className="text-xs font-bold text-amber-500 uppercase tracking-widest hover:text-amber-400">View All</button>
          </Link>

          {/* Settings Card */}
          <Link href="/account/settings" className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
            <Settings className="text-amber-500 mb-4" />
            <h2 className="font-bold mb-1">Settings</h2>
            <p className="text-sm text-zinc-500 mb-4">Account security and preferences</p>
            <button className="text-xs font-bold text-amber-500 uppercase tracking-widest hover:text-amber-400">Manage</button>
          </Link>
        </div>

        {/* Cassius Branding */}
        <div className="mt-20 text-center opacity-20">
            <span className="text-2xl font-black tracking-tighter uppercase">
                Cassius<span className="text-red-500">.</span>
            </span>
        </div>
      </div>
    </div>
  )
}