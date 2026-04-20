"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const NotificationBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();

  const isHomePage = pathname === "/";
  const isSignInPage = /^\/(login|signup|error)/.test(pathname);

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

  if (isSignInPage) return null;

  return (
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