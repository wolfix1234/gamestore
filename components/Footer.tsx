'use client'

import { Phone, Mail, Instagram, Twitter, Gamepad2, Zap, Shield } from 'lucide-react';
import Link from "next/link";
import {motion} from "framer-motion";

export default function Footer() {
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-cyber-black py-6 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8 border-t border-electric-blue/40 overflow-hidden z-content">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-8">
          {/* First column - About */}
          <div className="flex flex-col max-w-full md:max-w-md">
            <div className="flex flex-row items-center mb-3 sm:mb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-gradient rounded-full flex items-center justify-center glow-blue">
                <Gamepad2 className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
              </div>
              <h3 className="ml-3 sm:ml-4 text-lg sm:text-xl font-bold text-electric-blue text-glow">CyberStore</h3>
            </div>
            <p className="text-left text-readable-secondary text-sm sm:text-base">
              CyberStore is your ultimate destination for cutting-edge gaming experiences. 
              We offer the latest AAA games, premium gaming hardware, and digital adventures 
              in a futuristic, immersive environment. Our focus on quality, customer satisfaction, 
              and authentic products ensures an unforgettable gaming journey.
            </p>
          </div>

          {/* Second column - Gaming Features and Social */}
          <div className="flex flex-col gap-4 sm:gap-6 mt-6 md:mt-0">
            {/* Gaming Features */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              <div className="glass-effect p-4 rounded-lg glow-blue text-center">
                <Zap className="w-6 h-6 text-electric-blue mx-auto mb-2" />
                <p className="text-xs text-readable">Fast Download</p>
              </div>
              <div className="glass-effect p-4 rounded-lg glow-blue text-center">
                <Shield className="w-6 h-6 text-electric-blue mx-auto mb-2" />
                <p className="text-xs text-readable">Secure Gaming</p>
              </div>
              <div className="glass-effect p-4 rounded-lg glow-blue text-center">
                <Gamepad2 className="w-6 h-6 text-electric-blue mx-auto mb-2" />
                <p className="text-xs text-readable">24/7 Support</p>
              </div>
            </div>
            
            <div className="flex flex-row items-end justify-end gap-3 sm:gap-4 md:gap-6">
              <div className="p-1.5 sm:p-2 glass-effect rounded-lg hover:bg-electric-blue/20 transition-colors glow-blue">
                <Link href="#" className="text-electric-blue">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </Link>
              </div>
              <div className="p-1.5 sm:p-2 glass-effect rounded-lg hover:bg-electric-blue/20 transition-colors glow-blue">
                <Link href="#" className="text-electric-blue">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </Link>
              </div>
              <div className="p-1.5 sm:p-2 glass-effect rounded-lg hover:bg-electric-blue/20 transition-colors glow-blue">
                <Link href="#" className="text-electric-blue">
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </Link>
              </div>
              <div className="p-1.5 sm:p-2 glass-effect rounded-lg hover:bg-electric-blue/20 transition-colors glow-blue">
                <Link href="#" className="text-electric-blue">
                  <Twitter className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Futuristic footer bottom with scroll-to-top */}
      <div className="relative mt-8 sm:mt-10">
        {/* Circle button */}
        <motion.button
          onClick={scrollToTop}
          className="absolute top-[-20px] sm:top-[-25px] md:top-[-30px] left-1/2 transform -translate-x-1/2 w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-blue-gradient rounded-full shadow-neon flex items-center justify-center z-10 glow-blue-strong"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </motion.button>

        {/* Futuristic footer content */}
        <div className="relative glass-effect-strong p-6 sm:p-8 md:p-10 rounded-t-lg sm:rounded-t-xl shadow-neon z-0 overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
            <div className="text-center md:text-left">
              <motion.p 
                className="text-readable text-sm sm:text-base md:text-lg font-medium mb-1 sm:mb-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                All rights reserved by CyberStore Gaming Hub
              </motion.p>
              <motion.p 
                className="text-electric-blue text-xs sm:text-sm md:text-base"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Powered by Future Tech Solutions
              </motion.p>
            </div>
            
            <div className="flex flex-col items-center md:items-right mt-4 md:mt-0">
              <motion.p 
                className="text-readable text-sm sm:text-base md:text-lg font-medium mb-1"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                © 2024 | Designed by
              </motion.p>
              <motion.a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-electric-blue text-xs sm:text-sm md:text-base font-bold hover:text-white transition-colors duration-300 text-glow"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                CYBERSTORE.TECH
              </motion.a>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-electric-blue opacity-10 rounded-full transform translate-x-0 -translate-y-1/3 glow-blue"></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-electric-blue opacity-10 rounded-full transform translate-x-1/3 translate-y-1/3 glow-blue"></div>
        </div>
      </div>
    </footer>
  );
}