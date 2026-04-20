"use client";

import { Menu, X } from "lucide-react";

interface MobileNavButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

const MobileNavButton = ({ isOpen, onToggle }: MobileNavButtonProps) => {
  return (
    <button
      onClick={onToggle}
      className="md:hidden text-gray-400 hover:text-white transition focus:outline-none group relative"
      aria-label="Toggle Menu"
    >
      {isOpen ? <X size={24} /> : <Menu size={24} />}
      <span className="tooltip">Menu</span>
    </button>
  );
};

export default MobileNavButton;