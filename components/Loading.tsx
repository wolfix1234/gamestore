"use client";

import { motion } from "framer-motion";
import { Gamepad2, Zap, Trophy, Shield } from "lucide-react";

interface LoadingProps {
  message?: string;
  showIcons?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ 
  message = "Loading Gaming Universe...", 
  showIcons = true 
}) => {
  const icons = [Gamepad2, Zap, Trophy, Shield];

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyber-gradient relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 grid-bg opacity-20"></div>
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-electric-blue/10 glow-blue"
            style={{
              width: `${60 + (i % 4) * 20}px`,
              height: `${60 + (i % 4) * 20}px`,
              left: `${(i * 8) % 100}%`,
              top: `${(i * 11) % 100}%`,
            }}
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -30, 20, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 8 + (i % 3) * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center">
        {/* Main Loading Animation */}
        <motion.div
          className="relative mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Outer Ring */}
          <motion.div
            className="w-32 h-32 mx-auto border-4 border-electric-blue/30 rounded-full relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            {/* Inner Ring */}
            <motion.div
              className="absolute inset-2 border-4 border-cyan-400/50 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              {/* Core */}
              <motion.div
                className="absolute inset-4 bg-blue-gradient rounded-full flex items-center justify-center shadow-neon glow-blue-strong"
                animate={{
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    "0 0 20px rgba(6, 182, 212, 0.5)",
                    "0 0 40px rgba(6, 182, 212, 0.8)",
                    "0 0 20px rgba(6, 182, 212, 0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Gamepad2 className="w-8 h-8 text-black" />
              </motion.div>
            </motion.div>

            {/* Orbiting Icons */}
            {showIcons && icons.map((Icon, index) => (
              <motion.div
                key={index}
                className="absolute w-8 h-8 bg-electric-blue/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-electric-blue/40"
                style={{
                  top: "50%",
                  left: "50%",
                  transformOrigin: "0 0",
                }}
                animate={{
                  rotate: 360,
                  x: Math.cos((index * Math.PI) / 2) * 60 - 16,
                  y: Math.sin((index * Math.PI) / 2) * 60 - 16,
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                  delay: index * 0.5,
                }}
              >
                <Icon className="w-4 h-4 text-electric-blue" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          className="space-y-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-electric-blue text-glow">
            {message}
          </h2>
          
          {/* Progress Dots */}
          <div className="flex justify-center space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-electric-blue rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>

          {/* Loading Bar */}
          <div className="w-64 h-2 bg-gray-800/50 rounded-full mx-auto overflow-hidden backdrop-blur-sm border border-electric-blue/30">
            <motion.div
              className="h-full bg-blue-gradient rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          <p className="text-readable-secondary text-sm">
            Initializing gaming experience...
          </p>
        </motion.div>
      </div>

      {/* Particle Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-electric-blue rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loading;