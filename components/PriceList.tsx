"use client";

import React from "react";
import { motion } from "framer-motion";

export default function PriceList() {
  const categories = [
    {
      id: 1,
      title: "PC Gaming Setup",
      skill: "Professional gaming PC configuration and optimization",
      price: 1500,
    },
    {
      id: 2,
      title: "Console Gaming",
      skill: "PlayStation, Xbox, and Nintendo Switch setup",
      price: 800,
    },
    {
      id: 3,
      title: "VR Gaming",
      skill: "Virtual reality headset setup and game installation",
      price: 2000,
    },
    {
      id: 4,
      title: "Gaming Gear",
      skill: "Professional gaming peripherals and accessories",
      price: 1200,
    },
    {
      id: 5,
      title: "Esports Training",
      skill: "Professional coaching for competitive gaming",
      price: 900,
    },
    {
      id: 6,
      title: "Game Development",
      skill: "Unity and Unreal Engine development services",
      price: 700,
    },
    {
      id: 7,
      title: "Streaming Setup",
      skill: "Professional streaming configuration and optimization",
      price: 500,
    },
    {
      id: 8,
      title: "Gaming Support",
      skill: "Technical support and troubleshooting services",
      price: 600,
    },
  ];

  const formatPrice = (price: number) => {
    return "$" + new Intl.NumberFormat("en-US").format(price);
  };

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
        damping: 12,
      },
    },
  };

  return (
    <div className="mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-cyan-400 mb-2 glow">
          Gaming Services Pricing
        </h2>
        <p className="text-gray-300">Updated pricing for all our gaming services</p>
      </div>

      <motion.div
        className="bg-gray-800 border border-gray-700 rounded-xl shadow-2xl overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-cyan-400 text-black py-4 px-6 grid grid-cols-4 items-center">
          <div className="text-center">
            <h3 className="font-bold text-lg">Service</h3>
          </div>
          <div className="text-center">
            <h3 className="font-bold text-lg">Description</h3>
          </div>
          <div className="text-center">
            <h3 className="font-bold text-lg">Price</h3>
          </div>
          <div className="text-center">
            <h3 className="font-bold text-lg">Book</h3>
          </div>
        </div>

        {categories.map((category) => (
          <motion.div
            key={category.id}
            className="grid grid-cols-4 items-center py-4 px-6 border-b border-gray-700 hover:bg-gray-700/50 transition-colors duration-150"
            variants={itemVariants}
          >
            <div className="text-center font-bold text-white">
              {category.title}
            </div>
            <div className="text-center text-gray-300">{category.skill}</div>
            <div className="text-center text-cyan-400 font-bold">
              {formatPrice(category.price)}
            </div>
            <div className="text-center">
              <button className="bg-cyan-400 text-black py-2 px-4 rounded-full text-sm font-medium transition-colors duration-150 hover:bg-cyan-300 hover:scale-105 transform">
                Book Now
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}