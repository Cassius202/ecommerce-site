"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const NotificationBar = () => {
  const [mounted, setMounted] = useState(false); // To prevent hydration flicker
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();

  // Robust path check
  const isHomePage = pathname === "/" || pathname === "" || pathname === null;
  const isSignInPage = /^\/(login|signup|error)/.test(pathname || "");

  useEffect(() => {
    setMounted(true); // Signal that we are safely in the browser

    const handleScroll = () => {
      // Check if we are actually on the home page before toggling visibility
      if (window.scrollY > 20) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 1. Don't render anything until client-side hydration is done
  // 2. Hide on Auth pages
  // 3. Hide if it's not the home page
  if (!mounted || isSignInPage || !isHomePage) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden text-center text-sm font-medium py-2 bg-linear-to-r from-violet-500 via-[#9938CA] to-[#E0724A] text-white"
        >
          <p>
            Exclusive Price Drop! Hurry,{" "}
            <Link href="/offers" className="underline underline-offset-2">
              Offer Ends Soon!
            </Link>
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationBar;