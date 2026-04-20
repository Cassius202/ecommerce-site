"use client";

import { HeaderProfile } from "@/utils/actions/header.actions";
import { cn } from "@/utils/cn";
import { defaultProfilePic } from "@/constants/assets";
import Image from "next/image";
import { signOut } from "@/app/login/actions";
import Link from "next/link";

interface ProfileParams {
  profile: HeaderProfile | null;
  isLoggedIn: boolean;
}

const ProfileItems = ({ profile, isLoggedIn }: ProfileParams) => {
  const avatarUrl =
    isLoggedIn && profile?.avatar_url ? profile.avatar_url : defaultProfilePic;
  const avatarAlt = isLoggedIn
    ? profile?.full_name || "User"
    : "Default Profile";

  return (
    <div className="relative group mr-2 cursor-pointer">
      <button
        type="button"
        className={cn(
          "items-center justify-center transition-all duration-200 flex",
          isLoggedIn
            ? "rounded-full overflow-hidden ring-2 ring-transparent group-hover:ring-gray-700"
            : "p-2 rounded-full hover:bg-zinc-800",
        )}
        aria-label="Account"
      >
        <Image
          src={avatarUrl}
          alt={avatarAlt}
          width={32}
          height={32}
          className={cn(
            "object-cover transition-transform duration-200",
            isLoggedIn ? "w-8 h-8" : "w-5 h-5",
          )}
        />
      </button>

      {/* Dropdown Menu */}
      {isLoggedIn && (
        <div className="absolute cursor-pointer right-0 top-full mt-3 w-56 bg-zinc-900 border border-zinc-800 rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 shadow-lg">
          {/* Profile Header */}
          <div className="px-4 py-3 border-b border-zinc-800">
            <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider mb-1">
              Account
            </p>
            <p className="text-sm font-bold text-white truncate">
              {profile?.username || profile?.email}
            </p>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <button className="w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800/50 hover:text-white transition-colors duration-150">
              My Account
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800/50 hover:text-white transition-colors duration-150">
              Order History
            </button>
          </div>

          {/* Divider */}
          <div className="h-px bg-zinc-800 my-2" />

          {/* Logout */}
          <button
            className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors duration-150 font-medium"
            onClick={signOut}
          >
            Sign Out
          </button>
        </div>
      )}

      {!isLoggedIn && (
        <div className="absolute right-0 top-full mt-3 w-44 bg-zinc-950/95 backdrop-blur-md border border-zinc-800 rounded-xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out z-50 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] flex flex-col gap-1">
          {/* Small Header Tag */}
          <div className="px-3 py-2">
            <p className="text-[10px] font-black text-center uppercase tracking-[0.15em] text-zinc-500">
              Welcome
            </p>
          </div>

          {/* Login Link - High Emphasis */}
          <Link
            href="/login"
            className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-bold text-black bg-amber-500 hover:bg-amber-400 rounded-lg transition-all duration-200 active:scale-[0.98]"
          >
            Sign In
          </Link>

          {/* Signup Link - Subtle emphasis */}
          <Link
            href="/signup"
            className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg transition-all duration-200"
          >
            Create Account
          </Link>

          <div className="h-px bg-zinc-800 my-1 mx-2" />

          <p className="px-3 py-2 text-[10px] text-zinc-600 text-center">
            Access exclusive deals & tracking
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfileItems;
