import { Database } from "../../types/supabase";

  export const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  export type ProductParams = Database['public']['Tables']['products']['Row'];

  export const LoginVideo = "https://mivqdvmsqufpcgemrgpf.supabase.co/storage/v1/object/public/videos/shopping%20video.mp4";