"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useAnimation, PanInfo } from "framer-motion";
import image1 from "@/public/image1.jpg";
import image2 from "@/public/image2.jpg";
import image3 from "@/public/image3.jpg";

const images = [image1, image2, image3];

export const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const controls = useAnimation();
  const [isDragging, setIsDragging] = useState(false);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Handle drag gestures
  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setIsDragging(false);
    const threshold = 50; // minimum distance required for a swipe

    if (info.offset.x > threshold) {
      handlePrev();
    } else if (info.offset.x < -threshold) {
      handleNext();
    } else {
      // If the drag wasn't far enough, reset the position
      controls.start({ x: 0 });
    }
  };

  // Auto-slide every 5 seconds, but only if not dragging
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        handleNext();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isDragging]);

  // Variants for slide animations
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 400, damping: 40 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 100, damping: 40 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  return (
    <div id="controls-carousel" className="relative w-full z-0 overflow-hidden">
      {/* Carousel wrapper */}
      <motion.div
        className="relative h-56 md:h-128 overflow-hidden"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        animate={controls}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute top-0 left-0 w-full h-full"
          >
            <Image
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              fill
              style={{ objectFit: "cover" }}
              priority={currentIndex === 0}
              draggable="false"
            />

            {/* Game Store Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cyber-black/95 to-transparent p-6 z-content">
              <h2 className="text-readable text-xl md:text-4xl font-bold text-glow mb-2">
                {currentIndex === 0 && "Latest AAA Games"}
                {currentIndex === 1 && "Epic Gaming Gear"}
                {currentIndex === 2 && "Digital Adventures"}
              </h2>
              <p className="text-electric-blue mt-2 max-w-md text-lg">
                {currentIndex === 0 && "Discover the newest releases and blockbuster titles"}
                {currentIndex === 1 && "Premium gaming hardware and accessories"}
                {currentIndex === 2 && "Immersive experiences await you"}
              </p>
              <button className="mt-4 btn-primary px-6 py-3 rounded-lg font-bold hover:shadow-glow-blue transition-all duration-300 glow-blue">
                Explore Now
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Futuristic touch indicator */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <motion.div
          className="bg-electric-blue/20 backdrop-blur-sm rounded-full p-6 border border-electric-blue/30 glow-blue"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{
            repeat: 2,
            repeatType: "reverse",
            duration: 1,
          }}
        >
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: [-20, 20, -20] }}
            transition={{
              repeat: 2,
              repeatType: "loop",
              duration: 1.5,
              ease: "easeInOut",
            }}
            className="text-electric-blue text-lg font-medium text-glow"
          >
            ← Swipe →
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Futuristic Slider controls */}
      {/* <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={handlePrev}
      >
        <motion.span
          className="inline-flex items-center justify-center w-10 h-10 rounded-full backdrop-blur-sm border border-electric-blue/30"
          whileHover={{
            scale: 1.1,
            backgroundColor: "rgba(0, 212, 255, 0.2)",
            boxShadow: "0 0 20px rgba(0, 212, 255, 0.5)",
          }}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            className="w-4 h-8 text-electric-blue"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </motion.span>
      </button>

      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4"
        onClick={handleNext}
      >
        <motion.span
          className="inline-flex items-center justify-center w-10 h-10 rounded-full backdrop-blur-sm border border-electric-blue/30"
          whileHover={{
            scale: 1.1,
            backgroundColor: "rgba(0, 212, 255, 0.2)",
            boxShadow: "0 0 20px rgba(0, 212, 255, 0.5)",
          }}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            className="w-4 h-8 text-electric-blue"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </motion.span>
      </button> */}

      {/* Futuristic slide counter */}
      <div className="absolute top-4 right-4 glass-effect text-electric-blue px-4 py-2 rounded-full text-sm glow-blue z-content">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

export default Slider;
