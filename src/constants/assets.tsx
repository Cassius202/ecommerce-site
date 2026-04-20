import { Database } from "../../types/supabase";

export const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/products" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export type ProductParams = Database["public"]["Tables"]["products"]["Row"];

export const LoginVideo =
  "https://mivqdvmsqufpcgemrgpf.supabase.co/storage/v1/object/public/videos/shopping%20video.mp4";

export interface UserDetails {
  full_name?: string;
  username?: string;
  avatar_url?: string;
  phone_number?: string;
  email: string;
}

export const defaultProfilePic =
  "https://mivqdvmsqufpcgemrgpf.supabase.co/storage/v1/object/public/avatars/8792047.png";

export interface PaystackResponse {
  status: string;
  url: string;
  access_code: string;
  reference: string;
}
