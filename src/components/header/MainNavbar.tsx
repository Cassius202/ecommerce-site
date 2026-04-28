"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/constants/assets";
import { usePathname } from "next/navigation";
import MobileNavButton from "./SidbarBtn";
import { HeaderProfile } from "@/utils/actions/header.actions";
import ProfileItems from "./ProfileItems";
import { defaultProfilePic } from "@/constants/assets";
import MobileMenu from "./MobileMenu";

interface ProfileParams {
  profile: HeaderProfile | null;
  isLoggedIn: boolean;
}

const MainNavBar = ({ profile, isLoggedIn }: ProfileParams) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isSignInPage = /^\/(login|signup|error|checkout)/.test(pathname);

  if (isSignInPage) return null;

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const avatarUrl =
    isLoggedIn && profile?.avatar_url ? profile.avatar_url : defaultProfilePic;

  return (
    <nav className="h-[70px] flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 bg-black text-white shadow-md border-b border-gray-900">
      {/* Brand/Logo */}
      <Link href="/" className="flex items-center gap-2 cursor-pointer">
        <Image
          src="/store.png"
          width={32}
          height={32}
          alt="logo"
          className="object-cover invert"
        />
        <span className="font-bold text-sm sm:text-lg tracking-tight">
          Cassius <br className="sm:hidden" /> Store
        </span>
      </Link>

      {/* Desktop Links */}
      <ul className="hidden md:flex items-center space-x-8 text-gray-400">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className="hover:text-white transition-colors duration-200"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Right Side Icons */}
      <div className="flex items-center gap-3">
        {/* Search Button */}
        <button
          type="button"
          className="p-2 rounded-full hover:bg-zinc-800 transition-all relative group"
          aria-label="Search"
        >
          <Search className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
          <span className="tooltip">Search for an item</span>
        </button>

        {/* Shopping Cart Button */}
        <button
          type="button"
          className="p-2 rounded-full hover:bg-zinc-800 transition-all group relative"
          aria-label="Shopping Cart"
        >
          <ShoppingCart className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
          <span className="tooltip">Shopping Cart</span>
        </button>

        {/* User Profile Button */}
        <ProfileItems profile={profile} isLoggedIn={isLoggedIn} />
        {/* Mobile Menu Toggle */}
        <MobileNavButton isOpen={isOpen} onToggle={toggleMenu} />
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <MobileMenu closeMenu={closeMenu} profile={profile} avatarUrl={avatarUrl} isLoggedIn={isLoggedIn} />
        )}
      </AnimatePresence>
    </nav>
  );
};

export default MainNavBar;
