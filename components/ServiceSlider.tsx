"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, PanInfo, useAnimation } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Service = {
  id: number;
  title: string;
  icon: string;
};

const services: Service[] = [
  { id: 1, title: "PC Gaming", icon: "🖥️" },
  { id: 2, title: "Console Gaming", icon: "🎮" },
  { id: 3, title: "VR Gaming", icon: "🥽" },
  { id: 4, title: "Esports", icon: "🏆" },
  { id: 5, title: "Game Development", icon: "⚙️" },
  { id: 6, title: "Streaming Setup", icon: "📹" },
];

const ServiceSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(4);
  const [sliderWidthValue, setSliderWidthValue] = useState(0);
  console.log(sliderWidthValue)
  const [cardWidth, setCardWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

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

      if (sliderRef.current) {
        const containerWidth = sliderRef.current.clientWidth;
        setSliderWidthValue(containerWidth);
        setCardWidth(containerWidth / newCardsPerView);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const maxIndex = Math.max(0, services.length - cardsPerView);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      controls.start({ x: -currentIndex * cardWidth + cardWidth });
    }
  };

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
      controls.start({ x: -(currentIndex + 1) * cardWidth });
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
    setAutoplayEnabled(false);
  };

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setIsDragging(false);

    const threshold = cardWidth / 3;
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    const isFastSwipe = Math.abs(velocity) > 500;

    if (offset > threshold || (isFastSwipe && velocity > 0)) {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    } else if (offset < -threshold || (isFastSwipe && velocity < 0)) {
      if (currentIndex < maxIndex) {
        setCurrentIndex(currentIndex + 1);
      }
    }

    controls.start({
      x: -currentIndex * cardWidth,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    });

    setTimeout(() => setAutoplayEnabled(true), 3500);
  };

  useEffect(() => {
    if (!autoplayEnabled || isDragging) return;

    const interval = setInterval(() => {
      if (currentIndex < maxIndex) {
        setCurrentIndex((prev) => prev + 1);
        controls.start({
          x: -(currentIndex + 1) * cardWidth,
          transition: { type: "spring", stiffness: 300, damping: 30 },
        });
      } else {
        setCurrentIndex(0);
        controls.start({
          x: 0,
          transition: { type: "spring", stiffness: 300, damping: 30 },
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [
    currentIndex,
    maxIndex,
    cardWidth,
    autoplayEnabled,
    isDragging,
    controls,
  ]);

  useEffect(() => {
    controls.start({
      x: -currentIndex * cardWidth,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    });
  }, [currentIndex, cardWidth, controls]);

  return (
    <div className="mx-auto text-center mt-20 mb-10 px-4 bg-gradient-to-b from-black to-gray-900 py-16">
      <div className="flex items-center justify-between mb-8" >
        <h2 className="text-3xl text-cyan-400 font-bold">Gaming Services</h2>
        <div className="flex justify-center items-center">
          <motion.button
            onClick={handleNext}
            className={`bg-gray-800 border border-cyan-400 text-cyan-400 text-3xl rounded-2xl w-10 h-10 mx-2 shadow-lg flex items-center justify-center ${
              currentIndex >= maxIndex
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-cyan-400 hover:text-black"
            }`}
            whileHover={{ scale: currentIndex >= maxIndex ? 1 : 1.1 }}
            whileTap={{ scale: currentIndex >= maxIndex ? 1 : 0.9 }}
            disabled={currentIndex >= maxIndex}
          >
            <ChevronRight size={24} />
          </motion.button>
          <motion.button
            onClick={handlePrev}
            className={`bg-gray-800 border border-cyan-400 text-cyan-400 text-3xl rounded-2xl w-10 h-10 mx-2 shadow-lg flex items-center justify-center ${
              currentIndex <= 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-cyan-400 hover:text-black"
            }`}
            whileHover={{ scale: currentIndex <= 0 ? 1 : 1.1 }}
            whileTap={{ scale: currentIndex <= 0 ? 1 : 0.9 }}
            disabled={currentIndex <= 0}
          >
            <ChevronLeft size={24} />
          </motion.button>
        </div>
      </div>

      <div className="relative cursor-move overflow-hidden" ref={sliderRef}>
        <motion.div
          className="flex"
          drag="x"
          dragConstraints={{ left: -maxIndex * cardWidth, right: 0 }}
          dragElastic={0.1}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          animate={controls}
          initial={{ x: 0 }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="flex-shrink-0"
              style={{ width: `${100 / cardsPerView}%` }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-2 h-full">
                <motion.div
                  className="bg-gray-800 border border-gray-700 rounded-2xl group hover:bg-cyan-400 hover:text-black shadow-2xl p-5 h-full flex flex-col items-center justify-center transition-colors duration-300"
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="text-5xl mb-4"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                      delay: index * 0.05,
                    }}
                  >
                    {service.icon}
                  </motion.div>
                  <h3 className="text-lg group-hover:text-black text-white font-medium">
                    {service.title}
                  </h3>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="flex justify-center mt-6">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <motion.button
            key={index}
            className={`w-2 h-2 mx-1 rounded-full ${
              index === currentIndex ? "bg-cyan-400" : "bg-gray-600"
            }`}
            onClick={() => {
              setCurrentIndex(index);
              controls.start({
                x: -index * cardWidth,
                transition: { type: "spring", stiffness: 300, damping: 30 },
              });
            }}
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 0.9 }}
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{
              scale: index === currentIndex ? 1.2 : 1,
              opacity: index === currentIndex ? 1 : 0.7,
            }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceSlider;