"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Search, X, ExternalLink } from "lucide-react";
import { Star, Sparkles, Scissors, Palette } from "lucide-react";
import Image from 'next/image'

const galleryItems = [
  {
    id: 1,
    category: "all",
    image: "/image1.jpg",
    title: "Epic Gaming Setup",
    description: "Professional gaming station with RGB lighting and premium peripherals",
  },
  {
    id: 2,
    category: "pc-gaming",
    image: "/image2.jpg",
    title: "Custom Gaming PC",
    description: "High-performance gaming PC with latest graphics card and cooling system",
  },
  {
    id: 3,
    category: "console",
    image: "/image3.jpg",
    title: "Console Gaming",
    description: "Multi-console setup with PlayStation, Xbox, and Nintendo Switch",
  },
  {
    id: 4,
    category: "vr-gaming",
    image: "/image1.jpg",
    title: "VR Gaming",
    description: "Immersive virtual reality gaming setup with motion tracking",
  },
  {
    id: 5,
    category: "pc-gaming",
    image: "/image2.jpg",
    title: "Esports Arena",
    description: "Professional esports gaming environment for competitive play",
  },
  {
    id: 6,
    category: "console",
    image: "/image3.jpg",
    title: "Retro Gaming",
    description: "Classic gaming consoles and vintage game collection",
  },
  {
    id: 7,
    category: "vr-gaming",
    image: "/image1.jpg",
    title: "VR Adventure Zone",
    description: "Dedicated VR space with room-scale tracking and haptic feedback",
  },
  {
    id: 8,
    category: "pc-gaming",
    image: "/image2.jpg",
    title: "Streaming Studio",
    description: "Professional streaming setup with multiple cameras and lighting",
  },
];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredItems, setFilteredItems] = useState(galleryItems);
  const [selectedItem, setSelectedItem] = useState<
    (typeof galleryItems)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const galleryRef = useRef(null);
  const isInView = useInView(galleryRef, { once: true, amount: 0.1 });

  const categories = [
    { id: "all", label: "All Gaming", icon: <Star className="w-4 h-4" /> },
    {
      id: "console",
      label: "Console Gaming",
      icon: <Sparkles className="w-4 h-4" />,
    },
    { id: "vr-gaming", label: "VR Gaming", icon: <Scissors className="w-4 h-4" /> },
    { id: "pc-gaming", label: "PC Gaming", icon: <Palette className="w-4 h-4" /> },
  ];

  const handleFilterChange = (category: string) => {
    setActiveFilter(category);

    if (category === "all") {
      setFilteredItems(galleryItems);
    } else {
      setFilteredItems(
        galleryItems.filter((item) => item.category === category)
      );
    }
  };

  const openModal = (item: (typeof galleryItems)[0]) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <section
      className="py-16 px-4 bg-gradient-to-b from-black to-gray-900 relative"
    >
      <div className="absolute top-40 right-0 w-32 h-32 bg-cyan-500/20 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute bottom-40 left-0 w-48 h-48 bg-blue-500/20 rounded-full opacity-20 blur-xl"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-4 mt-4">
            Gaming Gallery
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6">
            Explore our collection of premium gaming experiences and digital adventures
          </p>
          <div className="w-24 h-1 bg-cyan-400 mx-auto rounded-full"></div>
        </motion.div>

        <motion.div
          className="flex justify-center items-center gap-1 sm:gap-4 mb-10 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => handleFilterChange(category.id)}
              className={`
      rounded-full py-1 px-2 sm:py-2.5 sm:px-4 text-xs sm:text-base font-medium cursor-pointer 
      flex items-center justify-center gap-1 sm:gap-2 transition-all duration-300
      min-w-[80px] sm:min-w-[100px] h-[32px] sm:h-[40px]
      ${
        activeFilter === category.id
          ? "bg-cyan-400 text-black shadow-lg shadow-cyan-400/25"
          : "bg-gray-800 border border-cyan-400/30 text-gray-300 hover:bg-gray-700"
      }
    `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 1 }}
              transition={{ duration: 0 }}
            >
              <motion.span
                className={`${
                  activeFilter === category.id ? "text-black" : "text-cyan-400"
                } text-sm sm:text-base flex-shrink-0`}
                animate={{
                  rotate: activeFilter === category.id ? [0, 15, 0, -15, 0] : 0,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {category.icon}
              </motion.span>
              <span className="truncate">{category.label}</span>
            </motion.button>
          ))}
        </motion.div>

        <div ref={galleryRef}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              exit="hidden"
            >
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  className="group relative overflow-hidden rounded-xl shadow-2xl bg-gray-800 border border-gray-700"
                  variants={itemVariants}
                  layoutId={`gallery-item-${item.id}`}
                  whileHover={{ y: -5 }}
                  onClick={() => openModal(item)}
                >
                  <div className="relative h-64 cursor-pointer w-full overflow-hidden">
                    <motion.div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end">
                      <div className="p-4 w-full">
                        <h3 className="text-lg font-semibold text-white">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-200 mt-1">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>

                    <motion.img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <motion.button
                      className="absolute top-3 right-3 z-20 bg-gray-800/80 border border-cyan-400 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => openModal(item)}
                    >
                      <Search size={18} className="text-cyan-400" />
                    </motion.button>
                  </div>

                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-1 bg-cyan-400"
                    initial={{ scaleX: 0, originX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {filteredItems.length === 0 && (
          <motion.div
            className="text-center py-16 bg-gray-800 border border-gray-700 rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block p-4 bg-cyan-400/20 rounded-full mb-4">
              <Search size={32} className="text-cyan-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No items found
            </h3>
            <p className="text-gray-400">Please select a different category</p>
          </motion.div>
        )}

        {filteredItems.length > 0 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              className="bg-gray-800 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black px-6 py-3 rounded-full font-medium inline-flex items-center gap-2 transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>View All Gallery</span>
              <ExternalLink size={16} />
            </motion.button>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && selectedItem && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative bg-gray-800 border border-gray-700 rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-10 bg-gray-700 border border-cyan-400 p-2 rounded-full"
                onClick={closeModal}
              >
                <X size={20} className="text-cyan-400" />
              </button>

              <div className="w-full md:w-2/3 h-64 md:h-auto relative">
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-full md:w-1/3 p-6 flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {selectedItem.title}
                </h3>
                <p className="text-sm text-cyan-400 mb-4">
                  {selectedItem.category}
                </p>
                <p className="text-gray-300 mb-6">{selectedItem.description}</p>

                <div className="mt-auto">
                  <motion.button
                    className="w-full bg-cyan-400 text-black py-3 rounded-lg font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Book Session
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}