"use client";
import { Phone, Heart, Scissors, Sparkles, Star, Zap } from "lucide-react";
import { useState } from "react";
import { ServiceContent } from "@/types";
import { motion } from "framer-motion";

interface SkillItem extends ServiceContent {
  level: number;
  icon: React.ReactNode;
}

const skillsData: SkillItem[] = [
  {
    id: 1,
    title: "PC Gaming Optimization",
    content:
      "Expert-level PC gaming optimization including hardware tuning, driver configuration, and performance enhancement for maximum gaming experience.",
    level: 90,
    icon: <Phone className="text-cyan-400" />,
  },
  {
    id: 2,
    title: "Console Setup",
    content:
      "Professional console gaming setup with advanced configuration techniques and platform-specific optimizations.",
    level: 75,
    icon: <Heart className="text-cyan-400" />,
  },
  {
    id: 3,
    title: "VR Gaming",
    content: "Virtual reality gaming setup with precision calibration and immersive experience optimization.",
    level: 85,
    icon: <Scissors className="text-cyan-400" />,
  },
  {
    id: 4,
    title: "Esports Training",
    content:
      "Complete esports training covering all aspects of competitive gaming including strategy and skill development.",
    level: 60,
    icon: <Sparkles className="text-cyan-400" />,
  },
  {
    id: 5,
    title: "Game Development",
    content:
      "Professional game development using modern engines and cutting-edge development techniques.",
    level: 95,
    icon: <Star className="text-cyan-400" />,
  },
  {
    id: 6,
    title: "Streaming Setup",
    content:
      "Professional streaming configuration with high-quality equipment and modern broadcasting techniques.",
    level: 80,
    icon: <Zap className="text-cyan-400" />,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export default function Skills() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="relative py-16 bg-gradient-to-b from-black to-gray-900">
      <div className="absolute top-40 left-10 w-32 h-32 bg-cyan-500/20 rounded-full opacity-30 blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500/20 rounded-full opacity-30 blur-xl"></div>

      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-4 mt-4">
            Gaming Expertise
          </h2>
          <div className="w-24 h-1 bg-cyan-400 mx-auto rounded-full"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          
        >
          {skillsData.map((skill) => (
            <motion.div
              key={skill.id}
              variants={itemVariants}
              onMouseEnter={() => setHoveredId(skill.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative"
            >
              <motion.div
                className="bg-gray-800 border border-gray-700 rounded-3xl shadow-2xl p-6 h-full transition-all duration-300"
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(6, 182, 212, 0.3)",
                  borderColor: "rgba(6, 182, 212, 0.6)",
                }}
              >
                <div className="relative mb-6">
                  <motion.div
                    className="absolute -top-3 -right-3 w-16 h-16 bg-cyan-400/20 rounded-full"
                    initial={{ scale: 0.8 }}
                    animate={{
                      scale: hoveredId === skill.id ? 1.1 : 1,
                      backgroundColor:
                        hoveredId === skill.id ? "rgba(6, 182, 212, 0.4)" : "rgba(6, 182, 212, 0.2)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                  <div className="relative z-10 w-10 h-10 flex items-center justify-center">
                    <motion.div
                      animate={{
                        rotate: hoveredId === skill.id ? 360 : 0,
                        scale: hoveredId === skill.id ? 1.2 : 1,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {skill.icon}
                    </motion.div>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3 text-white">
                  {skill.title}
                </h3>

                <p className="text-gray-300 mb-6 leading-relaxed">
                  {skill.content}
                </p>

                <div className="mt-auto">
                  <div className="flex items-center justify-between mb-2">
                    <motion.span
                      className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-cyan-400 bg-cyan-400/20"
                      whileHover={{ scale: 1.05 }}
                    >
                      Level
                    </motion.span>
                    <span className="text-sm font-semibold text-cyan-400">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-gray-700">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                    ></motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}