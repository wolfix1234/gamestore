"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Image from 'next/image'

const cardsData = [
  {
    id: 1,
    title: "Gaming Revolution",
    work: "PC Gaming",
    image: "/image1.jpg",
    description: "Why next-gen graphics cards are changing everything in gaming?",
  },
  {
    id: 2,
    title: "Esports Rising",
    work: "Competitive",
    image: "/image2.jpg",
    description: "The explosive growth of competitive gaming tournaments worldwide.",
  },
  {
    id: 3,
    title: "VR Gaming",
    work: "Virtual Reality",
    image: "/image3.jpg",
    description: "How virtual reality is creating immersive gaming experiences.",
  },
  {
    id: 4,
    title: "Console Wars",
    work: "Gaming",
    image: "/image2.jpg",
    description: "Latest console releases and their impact on the gaming industry.",
  },
  {
    id: 5,
    title: "Gaming Gear",
    work: "Hardware",
    image: "/image1.jpg",
    description: "Essential gaming peripherals every pro gamer needs to know.",
  },
  {
    id: 6,
    title: "Streaming Setup",
    work: "Content",
    image: "/image2.jpg",
    description: "Building the perfect streaming setup for content creators.",
  },
  {
    id: 7,
    title: "Game Development",
    work: "Industry",
    image: "/image3.jpg",
    description: "Behind the scenes of modern game development processes.",
  },
];

const CardSlider: React.FC = () => {
  const [[page], setPage] = useState([0, 0]);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [, setActiveCard] = useState<number | null>(null);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const controls = useAnimation();

  const maxVisibleIndex = Math.max(0, cardsData.length - cardsPerView);

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCardsPerView(1);
      } else if (width < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!isAutoplayPaused && !isDragging) {
      interval = setInterval(() => {
        if (page < maxVisibleIndex) {
          paginate(1);
        } else {
          setPage([0, 0]);
          controls.start({
            x: 0,
            transition: { type: "spring", stiffness: 300, damping: 30 },
          });
        }
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [page, maxVisibleIndex, isAutoplayPaused, isDragging, controls]);

  const paginate = (newDirection: number) => {
    if (isAnimating) return;

    setIsAnimating(true);

    const newPage = page + newDirection;

    if (newPage < 0 || newPage > maxVisibleIndex) {
      setIsAnimating(false);
      return;
    }

    setPage([newPage, newDirection]);

    setTimeout(() => setIsAnimating(false), 500);
  };

  const getCardWidth = () => {
    if (!containerRef.current) return 0;
    return containerRef.current.offsetWidth / cardsPerView;
  };

  const sliderVariants = {
    animate: (custom: number) => ({
      x: -custom * getCardWidth(),
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
      },
    }),
  };

  useEffect(() => {
    controls.start({
      x: -page * getCardWidth(),
      transition: { type: "spring", stiffness: 300, damping: 30 },
    });
  }, [page, controls]);

  const handleDragStart = () => {
    setIsDragging(true);
    setIsAutoplayPaused(true);
  };

  const handleDragEnd = (
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setIsDragging(false);
    setIsAutoplayPaused(false);

    const threshold = getCardWidth() / 3;
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    const isFastSwipe = Math.abs(velocity) > 500;

    if (offset > threshold || (isFastSwipe && velocity > 0)) {
      paginate(-1);
    } else if (offset < -threshold || (isFastSwipe && velocity < 0)) {
      paginate(1);
    } else {
      controls.start({
        x: -page * getCardWidth(),
        transition: { type: "spring", stiffness: 300, damping: 30 },
      });
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1, backgroundColor: "#06B6D4" },
    tap: { scale: 0.95 },
    disabled: { opacity: 0.5, scale: 1 },
  };

  const cardVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    hover: { y: -10, transition: { duration: 0.3 } },
  };

  const frontBoxVariants = {
    initial: { y: 20, opacity: 0, scale: 0.9 },
    animate: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.4 } },
    hover: {
      y: -5,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <div className="w-full max-w-7xl mx-auto text-center px-4 py-12 bg-gradient-to-b from-black to-gray-900">
      <div className="flex justify-between mb-6">
        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover={page > 0 ? "hover" : "disabled"}
          whileTap={page > 0 ? "tap" : "disabled"}
          onClick={() => paginate(-1)}
          disabled={page === 0}
          className={`bg-gray-800 border border-cyan-400 text-cyan-400 p-3 rounded-full overflow-hidden shadow-md ${
            page === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-cyan-400 hover:text-black"
          }`}
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </motion.button>

        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover={page < maxVisibleIndex ? "hover" : "disabled"}
          whileTap={page < maxVisibleIndex ? "tap" : "disabled"}
          onClick={() => paginate(1)}
          disabled={page >= maxVisibleIndex}
          className={`bg-gray-800 border border-cyan-400 text-cyan-400 p-3 rounded-full overflow-hidden shadow-md ${
            page >= maxVisibleIndex
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer hover:bg-cyan-400 hover:text-black"
          }`}
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </motion.button>
      </div>

      <div className="relative overflow-hidden" ref={containerRef}>
        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-cyan-500 opacity-20 z-0"
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-blue-500 opacity-15 z-0"
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 15,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="relative cursor-grab active:cursor-grabbing"
          ref={sliderRef}
          drag="x"
          dragConstraints={{
            left: -maxVisibleIndex * getCardWidth(),
            right: 0,
          }}
          dragElastic={0.1}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          animate={controls}
          custom={page}
          variants={sliderVariants}
          initial="animate"
          onMouseEnter={() => setIsAutoplayPaused(true)}
          onMouseLeave={() => setIsAutoplayPaused(false)}
        >
          <div className="flex">
            {cardsData.map((card, index) => (
              <motion.div
                key={card.id}
                className="flex-shrink-0 px-2"
                style={{ width: `${100 / cardsPerView}%` }}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                onHoverStart={() => setActiveCard(index)}
                onHoverEnd={() => setActiveCard(null)}
              >
                <div className="relative h-96 bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.title}
                      width={1000}
                      height={1000}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                  </div>

                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-900 to-transparent"
                    variants={frontBoxVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-cyan-400 text-sm font-medium bg-cyan-400/20 px-2 py-1 rounded-full">
                        {card.work}
                      </span>
                      <motion.div
                        className="w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center cursor-pointer"
                        whileHover={{ scale: 1.1, rotate: 45 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ArrowRight className="w-4 h-4 text-black" />
                      </motion.div>
                    </div>

                    <h3 className="text-white text-xl font-bold mb-2 text-right">
                      {card.title}
                    </h3>
                    <p className="text-gray-300 text-sm text-right leading-relaxed">
                      {card.description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CardSlider;