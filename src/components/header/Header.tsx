"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingCart, Menu, X, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/constants/assets";
import { usePathname } from "next/navigation";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const pathname = usePathname();

  const isHomePage = pathname === "/";

  // Track scroll position to hide notification bar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 font-sans">
      {/* Notification Bar with AnimatePresence */}
      <AnimatePresence>
        {isVisible && isHomePage && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden text-center text-sm font-medium py-2 bg-linear-to-r from-violet-500 via-[#9938CA] to-[#E0724A] text-white"
          >
            <p>
              Exclusive Price Drop! Hurry,{" "}
              <Link href="/offers" className="underline underline-offset-2">Offer Ends Soon!</Link>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Navigation */}
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
          <span className="font-bold text-lg tracking-tight">Cassius Store</span>
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
        <div className="flex items-center gap-5">
          <Search className="w-5 h-5 cursor-pointer text-gray-400 hover:text-white transition" />
          <ShoppingCart className="w-5 h-5 cursor-pointer text-gray-400 hover:text-white transition" />
          <Heart className="w-5 h-5 cursor-pointer text-gray-400 hover:text-white hidden sm:block transition" />

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-400 hover:text-white transition focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-[70px] left-0 w-full bg-black border-t border-gray-800 shadow-xl p-8 z-50 md:hidden"
            >
              <ul className="flex flex-col space-y-6 text-lg">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-gray-300 hover:text-white block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <button className="bg-white text-black font-semibold mt-8 w-full h-12 rounded-full active:scale-95 transition-all">
                Get started
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;