import React from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";

interface HamburgerButtonProps {
  onClick: () => void;
}

const HamburgerButton: React.FC<HamburgerButtonProps> = ({ onClick }) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      onClick={onClick}
      className="
        relative flex items-center gap-2 
        px-3 py-2 sm:px-4 sm:py-2 rounded-full
        border border-primary/30
        bg-white/60 dark:bg-gray-900/60 
        backdrop-blur-xl
        shadow-md hover:shadow-primary/30
        transition-all duration-300
        group
      "
    >
      {/* Subtle animated gradient glow (on hover) */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 opacity-0 group-hover:opacity-100"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundSize: "200% 200%",
        }}
      />

      {/* Icon rotation animation */}
      <motion.div
        whileHover={{ rotate: 15 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
        className="relative z-10"
      >
        <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-primary dark:text-primary/80 transition-colors" />
      </motion.div>

      {/* Label */}
      <span className="hidden sm:inline-block text-sm font-medium text-gray-800 dark:text-gray-200 relative z-10">
        Menu
      </span>

      {/* Glow ring pulse effect */}
      <motion.div
        className="absolute inset-0 rounded-full border border-primary/20"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.6, 0.1, 0.6],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.button>
  );
};

export default HamburgerButton;
