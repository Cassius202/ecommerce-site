import Link from "next/link";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";
import NewsletterSignup from "./Newsletter";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Track Order", href: "/track-order" },
  { label: "Contact", href: "/contact" },
];

const categories = [
  { label: "Phones", href: "/shop/phones" },
  { label: "Laptops", href: "/shop/laptops" },
  { label: "Watches", href: "/shop/watches" },
  { label: "Gaming", href: "/shop/gaming" },
  { label: "Accessories", href: "/shop/accessories" },
];

const Footer = () => {
  return (
    <footer className="bg-[#0d0d12] text-white pt-16 pb-8 px-[clamp(1.25rem,6vw,6rem)]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

        {/* Brand */}
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-bold tracking-tight mb-3">
            CASSIUS<span className="text-red-500">.</span>
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Your one-stop destination for premium digital products. Phones, laptops, watches, gaming gear — delivered to your door.
          </p>
          <div className="flex items-center gap-4 mt-6">
            <Link href="#" className="text-gray-500 hover:text-white transition-colors">
              <FaFacebook size={18} />
            </Link>
            <Link href="#" className="text-gray-500 hover:text-white transition-colors">
              <FaInstagram size={18} />
            </Link>
            <Link href="#" className="text-gray-500 hover:text-white transition-colors">
              <FaXTwitter size={18} />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-5">
            Quick Links
          </h3>
          <ul className="space-y-3">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-gray-400 text-sm hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-5">
            Categories
          </h3>
          <ul className="space-y-3">
            {categories.map((cat) => (
              <li key={cat.label}>
                <Link
                  href={cat.href}
                  className="text-gray-400 text-sm hover:text-white transition-colors"
                >
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact + Newsletter */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-5">
            Contact Us
          </h3>
          <ul className="space-y-2 mb-8">
            <li>
              <a
                href="mailto:hello@cassiusstore.com"
                className="text-gray-400 text-sm hover:text-white transition-colors"
              >
                hello@cassiusstore.com
              </a>
            </li>
            <li>
              <a
                href="tel:+2349161152071"
                className="text-gray-400 text-sm hover:text-white transition-colors"
              >
                +234 916 115 2071
              </a>
            </li>
            <li className="text-gray-400 text-sm leading-relaxed">
              Victoria Island, Lagos, Nigeria
            </li>
          </ul>

          <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-2">
            Newsletter
          </h3>
          <NewsletterSignup />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
        <p>© {new Date().getFullYear()} Cassius Store. All rights reserved.</p>
        <div className="flex items-center gap-5">
          <Link href="/privacy" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-gray-400 transition-colors">Terms of Service</Link>
          <Link href="/returns" className="hover:text-gray-400 transition-colors">Returns</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;