"use client";

import { useState } from "react";
import { ServiceContent } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

const services: ServiceContent[] = [
  {
    id: 1,
    title: "PC Gaming Setup",
    content:
      "Professional PC gaming setup includes hardware selection, performance optimization, and custom configuration. We ensure your gaming rig delivers maximum performance with proper cooling, cable management, and driver optimization for the ultimate gaming experience.",
  },
  {
    id: 2,
    title: "Console Gaming",
    content:
      "Console gaming services cover PlayStation, Xbox, and Nintendo Switch setup and optimization. We handle system configuration, game installation, and performance tuning to ensure smooth gameplay across all platforms.",
  },
  {
    id: 3,
    title: "VR Gaming Setup",
    content:
      "Virtual reality gaming setup requires precise calibration and space configuration. We install VR headsets, configure tracking systems, and optimize your play area for immersive gaming experiences.",
  },
  {
    id: 4,
    title: "Esports Training",
    content:
      "Professional esports training includes strategy development, skill improvement, and competitive preparation. Our coaches provide personalized training sessions to elevate your competitive gaming performance.",
  },
];

export default function ServiceTable() {
  const [selectedService, setSelectedService] = useState<ServiceContent>(
    services[0]
  );
  const [isContentVisible, setIsContentVisible] = useState(true);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const handleServiceChange = (service: ServiceContent) => {
    if (service.id === selectedService.id) return;

    setIsContentVisible(false);
    setTimeout(() => {
      setSelectedService(service);
      setIsContentVisible(true);
    }, 300);
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <div
      className="flex flex-col md:flex-row bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl max-w-7xl mx-auto my-10 mt-20 overflow-hidden"
      
    >
      <aside className="w-full md:w-1/3 p-4 border-l-2 border-cyan-400/30 border-dashed bg-gray-900/50">
        <nav className="flex flex-col space-y-2">
          {services.map((service) => (
            <motion.button
              key={service.id}
              onClick={() => handleServiceChange(service)}
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative text-right text-lg py-3 px-4 rounded-lg cursor-pointer overflow-hidden"
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
            >
              <motion.div
                className="absolute inset-0 bg-gray-700 rounded-lg z-0"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity:
                    hoveredId === service.id ||
                    selectedService.id === service.id
                      ? 1
                      : 0,
                  scale:
                    hoveredId === service.id ||
                    selectedService.id === service.id
                      ? 1
                      : 0.9,
                  backgroundColor:
                    selectedService.id === service.id ? "rgba(6, 182, 212, 0.2)" : "rgba(6, 182, 212, 0.1)",
                }}
                transition={{ duration: 0.2 }}
              />

              <span
                className={`relative z-10 ${
                  selectedService.id === service.id
                    ? "font-semibold text-cyan-400"
                    : "text-gray-300 hover:text-cyan-400"
                }`}
              >
                {service.title}
              </span>

              {selectedService.id === service.id && (
                <motion.div
                  className="absolute right-0 top-0 bottom-0 w-1 bg-cyan-400 rounded-r"
                  layoutId="activeIndicator"
                  initial={{ height: 0 }}
                  animate={{ height: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </nav>
      </aside>

      <div className="w-full md:w-2/3 p-6 bg-black/50">
        <AnimatePresence mode="wait">
          {isContentVisible && (
            <motion.div
              key={selectedService.id}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="h-full flex flex-col"
            >
              <motion.h2
                className="text-2xl font-semibold mb-4 text-cyan-400"
                variants={childVariants}
              >
                How is {selectedService.title} performed
              </motion.h2>

              <motion.p
                className="leading-relaxed text-gray-300 mb-6"
                variants={childVariants}
              >
                {selectedService.content}
              </motion.p>

              <motion.div className="mt-auto" variants={childVariants}>
                <motion.button
                  className="bg-cyan-400 text-black py-2 px-6 rounded-full cursor-pointer flex items-center justify-center group"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 15px -3px rgba(6, 182, 212, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Book Session</span>
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                    initial={{ x: 0 }}
                    animate={{ x: 0 }}
                    whileHover={{ x: -4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </motion.svg>
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}