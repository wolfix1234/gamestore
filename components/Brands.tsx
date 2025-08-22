"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, PanInfo, useAnimation } from "framer-motion";
import {
  Gamepad2,
  Monitor,
  Headphones,
  Zap,
  Trophy,
  Users,
} from "lucide-react";
type Service = {
  id: number;
  title: string;
  icon: React.ReactNode;
};

const services: Service[] = [
  {
    id: 1,
    title: "PC Gaming",
    icon: <Monitor className="text-cyan-400" size={32} />,
  },
  {
    id: 2,
    title: "Console Games",
    icon: <Gamepad2 className="text-cyan-400" size={32} />,
  },
  {
    id: 3,
    title: "Gaming Gear",
    icon: <Headphones className="text-cyan-400" size={32} />,
  },
  {
    id: 4,
    title: "Esports",
    icon: <Trophy className="text-cyan-400" size={32} />,
  },
  {
    id: 5,
    title: "VR Gaming",
    icon: <Zap className="text-cyan-400" size={32} />,
  },
  {
    id: 6,
    title: "Multiplayer",
    icon: <Users className="text-cyan-400" size={32} />,
  },
];

const ServiceSlider: React.FC = () => {
  const [[page], setPage] = useState([0, 0]);
  const [cardsPerView, setCardsPerView] = useState(4);
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDraggingState, setIsDraggingState] = useState(false);
  console.log(isDraggingState)

  const controls = useAnimation();

  const serviceCount = services.length;
  const maxVisibleIndex = Math.max(0, serviceCount - cardsPerView);

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      let newCardsPerView = 4;

      if (width < 640) {
        newCardsPerView = 1;
      } else if (width < 1024) {
        newCardsPerView = 2;
      } else if (width < 1280) {
        newCardsPerView = 3;
      } else {
        newCardsPerView = 4;
      }

      setCardsPerView(newCardsPerView);
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

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

  const cardVariants = {
    initial: {
      scale: 0.8,
      opacity: 0,
      y: 20,
    },
    animate: (i: number) => ({
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
    hover: {
      y: -10,
      scale: 1.05,

      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,

      transition: {
        duration: 0.1,
      },
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  const iconVariants = {
    initial: {
      scale: 0.5,
      opacity: 0,
      rotateY: 90,
    },
    animate: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
        delay: 0.2,
      },
    },
    hover: {
      scale: 1.2,
      y: -5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const circleVariants = {
    initial: {
      scale: 0,
      opacity: 0,
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.1,
      },
    },
    hover: {
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    },
  };

  const handleDragStart = () => {
    setIsDraggingState(true);
  };
  const handleDragEnd = (
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setIsDraggingState(false);

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
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          className="flex items-center justify-between mb-12"
          
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-start">
            <h2 className="text-4xl font-bold text-cyan-400 mb-2">Gaming Categories</h2>
            <div className="h-1 w-24 bg-cyan-400 rounded-full"></div>
            <p className="text-gray-300 mt-4 text-right max-w-xl">
              Discover the ultimate gaming experience with our premium collection of games and gear.
            </p>
          </div>
        </motion.div>

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
          >
            <div className="flex">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  className="flex-shrink-0"
                  style={{ width: `${100 / cardsPerView}%` }}
                  custom={index}
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  whileHover="hover"
                  whileTap="tap"
                  onHoverStart={() => setIsHovered(index)}
                  onHoverEnd={() => setIsHovered(null)}
                >
                  <div className="p-4 h-full">
                    <motion.div
                      className="relative bg-gray-800 border border-gray-700 rounded-2xl p-8 h-full flex flex-col items-center justify-center overflow-hidden"
                      style={{
                        boxShadow:
                          isHovered === index
                            ? "0 20px 25px -5px rgba(6, 182, 212, 0.3), 0 10px 10px -5px rgba(6, 182, 212, 0.2)"
                            : "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)",
                      }}
                    >
                      <motion.div
                        className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20 -mr-10 -mt-10"
                        style={{ backgroundColor: "#06B6D4" }}
                        variants={circleVariants}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                      />

                      <motion.div
                        className="relative z-10 text-6xl mb-6 p-5 rounded-full"
                        style={{
                          backgroundColor: "#06B6D430",
                        }}
                        variants={iconVariants}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                      >
                        {service.icon}
                      </motion.div>

                      <motion.h3
                        className="text-xl font-bold mb-2 text-white"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {service.title}
                      </motion.h3>

                      <motion.button
                        className="mt-6 px-4 py-2 bg-gray-700 border border-cyan-400 text-cyan-400 rounded-full text-sm font-medium hover:bg-cyan-400 hover:text-black transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0 4px 6px -1px rgba(6, 182, 212, 0.3)",
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Explore Now
                      </motion.button>

                      <motion.div
                        className="absolute bottom-0 left-0 w-20 h-20 rounded-tr-full opacity-10"
                        style={{ backgroundColor: "#06B6D4" }}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 0.1 }}
                        transition={{ delay: 0.2 }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSlider;