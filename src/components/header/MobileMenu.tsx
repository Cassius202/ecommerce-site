'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { X } from 'lucide-react';
import { navLinks } from '@/constants/assets';
import Image from 'next/image';
import { HeaderProfile } from '@/utils/actions/header.actions';
import { useState } from 'react';

interface MobileMenuParams {
  closeMenu: () => void;
  profile: HeaderProfile | null;
  avatarUrl: string;
  isLoggedIn: boolean;
}

const MobileMenu = ({ closeMenu, profile, avatarUrl, isLoggedIn }: MobileMenuParams) => {
  const [showConfirm, setShowConfirm] = useState(false);

  async function handleSignOut() {
    // Logic to actually logout here (e.g., supabase.auth.signOut())
    setShowConfirm(false);
    closeMenu();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="absolute top-0 left-0 w-full bg-black border-t border-gray-800 shadow-xl p-8 z-50 md:hidden border-b-2 rounded-b-3xl border-b-blue-500/75"
    >
      {/* --- CLOSE BUTTON --- */}
      <button
        onClick={closeMenu}
        className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors p-2"
        aria-label="Close menu"
      >
        <X size={24} />
      </button>

      {/* --- NAVIGATION LINKS --- */}
      <ul className="flex flex-col space-y-6 text-lg border-b border-gray-800 pb-8 mt-4">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              onClick={closeMenu}
              className="text-gray-300 hover:text-white block transition-colors"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* --- USER ACTIONS --- */}
      <div className="mt-8">
        {isLoggedIn ? (
          <div className="flex flex-col space-y-4">
            {/* Profile Card */}
            <Link
              href="/profile"
              onClick={closeMenu}
              className="flex items-center space-x-4 p-3 rounded-xl bg-gray-900 border border-gray-800 active:scale-[0.98] transition-transform"
            >
              <div className="relative w-12 h-12">
                <Image
                  src={avatarUrl}
                  alt={profile?.full_name || "Profile"}
                  fill
                  className="rounded-full object-cover border border-gray-700"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-medium text-base">
                  {profile?.full_name || "Account"}
                </span>
                <span className="text-gray-400 text-sm italic">View Profile</span>
              </div>
            </Link>

            {/* Logout Section */}
            <div className="pt-2">
              {!showConfirm ? (
                <button
                  onClick={() => setShowConfirm(true)}
                  className="text-red-400 text-sm font-medium bg-white/5 py-2 px-4 rounded-lg active:scale-95 transition-all"
                >
                  Sign out
                </button>
              ) : (
                <div className="flex items-center space-x-4 animate-in fade-in slide-in-from-left-2 duration-200">
                  <button
                    onClick={handleSignOut}
                    className="text-white text-sm font-bold bg-red-600 px-4 py-2 rounded-lg active:scale-95 transition-all"
                  >
                    Confirm Logout
                  </button>
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="text-gray-400 text-sm font-medium hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col space-y-4">
            <Link href="/login" onClick={closeMenu} className="w-full">
              <button className="text-white font-semibold w-full h-12 rounded-full border border-gray-700 active:scale-95 transition-all">
                Login
              </button>
            </Link>
            <Link href="/signup" onClick={closeMenu} className="w-full">
              <button className="bg-white text-black font-semibold w-full h-12 rounded-full active:scale-95 transition-all shadow-lg">
                Get started
              </button>
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MobileMenu;