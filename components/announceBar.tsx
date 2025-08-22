"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Bell, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface AnnouncementBarProps {
  message: string;
  link?: string;
  linkText?: string;
}

const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  message,
  link,
  linkText,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-r from-cyber-black via-cyber-gray to-cyber-dark text-readable overflow-hidden border-b border-blue-400 shadow-neon z-navbar"
        >
          <div className="container mx-auto px-4 py-2 sm:py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell size={18} className="animate-pulse text-electric-blue" />
                <p className="text-sm sm:text-base font-medium text-readable">{message}</p>
              </div>

              <div className="flex items-center space-x-4">
                {link && (
                  <Link
                    href={link}
                    className="text-xs sm:text-sm font-bold text-electric-blue hover:text-readable flex items-center glass-effect px-3 py-1 rounded-full hover:bg-electric-blue/20 transition-all duration-200"
                  >
                    <motion.span
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <ArrowLeft size={16} className="mr-1" />
                    </motion.span>
                    {linkText || "Learn More"}
                  </Link>
                )}

                <motion.button
                  onClick={handleClose}
                  className="p-1 rounded-full hover:bg-electric-blue/20 transition-colors text-electric-blue glass-effect"
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={18} />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnnouncementBar;
