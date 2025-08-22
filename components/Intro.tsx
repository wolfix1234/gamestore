"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { Play, Gamepad2, Zap, Trophy } from "lucide-react";

const Intro: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const circleVariants = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: {
      opacity: 0.3,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut",
      },
    },
  };

  // Handle video play
  const handlePlayVideo = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 300);
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 relative z-1">
      <motion.div
        className="flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-12 p-4 sm:p-6 md:p-8 bg-cyber-gray/50 backdrop-blur-md rounded-xl sm:rounded-2xl md:rounded-3xl border border-blue-300 shadow-neon relative"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Futuristic circle decoration */}
        <motion.div
          className="absolute top-1/2 -right-8 sm:-right-12 md:-right-16 w-24 sm:w-32 md:w-45 h-28 sm:h-40 md:h-50 bg-electric-blue/20 rounded-full -translate-y-1/2 z-0 hidden sm:block glow-blue"
          style={{ clipPath: "inset(0 0 0 50%)" }}
          variants={circleVariants}
          initial="hidden"
          animate="visible"
        />

        {/* Gaming showcase video */}
        <motion.div
          className="relative w-full sm:w-[280px] md:w-[300px] h-[250px] sm:h-[320px] md:h-[350px] rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-neon cursor-pointer hover:scale-105 transition-transform duration-300 mx-auto md:mx-0 shadow-neon"
          variants={itemVariants}
          whileHover={{
            boxShadow: "0 0 30px rgba(0, 212, 255, 0.6)",
          }}
        >
          <Image
            src="/image1.jpg"
            alt="Gaming Showcase"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 280px, 300px"
            priority
            className="object-cover rounded-lg sm:rounded-xl md:rounded-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cyber-black/70 to-transparent" />
          
          <motion.button
            type="button"
            aria-label="Play showcase video"
            className="absolute inset-0 flex items-center justify-center z-10"
            onClick={handlePlayVideo}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className="bg-blue-gradient w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-neon glow-blue-strong"
              animate={isPlaying ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Play className="w-5 h-5 sm:w-6 sm:h-6 text-black ml-1" fill="currentColor" />
            </motion.div>
          </motion.button>
        </motion.div>

        <motion.div
          className="max-w-md text-center md:text-left px-4"
          variants={itemVariants}
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-black text-electric-blue mb-3 sm:mb-4 text-glow"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Gaming Universe
          </motion.h2>
          <motion.p
            className="text-readable-secondary text-sm sm:text-base md:text-lg leading-relaxed mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            Step into the future of gaming with CyberStore. Experience cutting-edge 
            technology, immersive gameplay, and premium gaming gear that transforms 
            your digital adventures into extraordinary journeys.
          </motion.p>

          {/* Gaming features */}
          <div className="flex gap-4 mb-6">
            <div className="flex items-center gap-2 text-electric-blue">
              <Gamepad2 className="w-5 h-5" />
              <span className="text-sm">Premium Games</span>
            </div>
            <div className="flex items-center gap-2 text-electric-blue">
              <Zap className="w-5 h-5" />
              <span className="text-sm">Instant Access</span>
            </div>
            <div className="flex items-center gap-2 text-electric-blue">
              <Trophy className="w-5 h-5" />
              <span className="text-sm">Achievements</span>
            </div>
          </div>

          <motion.button
            className="mt-4 sm:mt-5 md:mt-6 btn-primary py-3 px-6 sm:px-8 rounded-full font-bold hover:shadow-glow-blue transition-all duration-300 text-sm sm:text-base glow-blue"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            Explore Games
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Intro;