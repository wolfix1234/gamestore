"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useAnimation, PanInfo } from "framer-motion";
import { ShoppingCart, Heart, Star, ChevronLeft, ChevronRight, Phone } from "lucide-react";

const cardsData = [
  { id: 1, title: "Gaming Headset", type: "Audio", price: "150", discount: 20, rating: 4.5 },
  { id: 2, title: "Gaming Mouse", type: "Peripheral", price: "80", discount: 0, rating: 5 },
  { id: 3, title: "Mechanical Keyboard", type: "Peripheral", price: "120", discount: 15, rating: 4.2 },
  { id: 4, title: "Gaming Monitor", type: "Display", price: "300", discount: 0, rating: 4.8 },
  { id: 5, title: "Gaming Chair", type: "Furniture", price: "250", discount: 10, rating: 3.9 },
  { id: 6, title: "Graphics Card", type: "Hardware", price: "500", discount: 0, rating: 4.7 },
  { id: 7, title: "VR Headset", type: "VR", price: "400", discount: 25, rating: 4.4 },
];

const CardSlider: React.FC = () => {
  const [[page], setPage] = useState([0, 0]);
  const [cardsPerView, setCardsPerView] = useState(4);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const controls = useAnimation();

  const calculateDiscountedPrice = (price: string, discount: number) => {
    if (!discount) return price;
    const numPrice = parseInt(price.replace(/,/g, ""));
    const discountedPrice = numPrice - (numPrice * discount / 100);
    return discountedPrice.toString();
  };

  const maxVisibleIndex = Math.max(0, cardsData.length - cardsPerView);

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

  const handleCardClick = (id: number) => {
    console.log(`Card ${id} clicked`);
  };

  const handleAddToCart = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    console.log(`Add to cart: ${id}`);
  };

  const handleWishlist = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    console.log(`Add to wishlist: ${id}`);
  };

  const handlePhoneClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    console.log(`Phone button clicked for card ${id}`);
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
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1, backgroundColor: "#06B6D4" },
    tap: { scale: 0.95 },
    disabled: { opacity: 0.5, scale: 1 }
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          className="flex items-center justify-between mb-12"
          
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-start">
            <h2 className="text-4xl font-bold text-cyan-400 mb-2">Gaming Store</h2>
            <div className="h-1 w-24 bg-cyan-400 rounded-full"></div>
            <p className="text-gray-300 mt-4 text-right max-w-xl">
              Premium gaming products with high quality and competitive prices
            </p>
          </div>
        </motion.div>

        <div className="flex justify-between items-center mb-8 px-4">
          <motion.button
            onClick={() => paginate(-1)}
            className={`bg-gray-800 border border-cyan-400 text-cyan-400 cursor-pointer rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 ${
              page <= 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-cyan-400 hover:text-black shadow-md"
            }`}
            variants={buttonVariants}
            initial="initial"
            whileHover={page > 0 ? "hover" : "disabled"}
            whileTap={page > 0 ? "tap" : "disabled"}
            disabled={page <= 0}
          >
            <ChevronLeft size={24} />
          </motion.button>

          <div className="flex gap-2">
            {Array.from({ length: maxVisibleIndex + 1 }).map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setPage([index, page < index ? 1 : -1])}
                className="w-3 h-3 rounded-full"
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  scale: index === page ? 1.2 : 1,
                  backgroundColor:
                    index === page
                      ? "rgb(6, 182, 212)"
                      : "rgb(75, 85, 99)",
                  boxShadow:
                    index === page
                      ? "0 0 12px rgba(6, 182, 212, 0.5)"
                      : "none",
                }}
                transition={{ duration: 0.3 }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <motion.button
            onClick={() => paginate(1)}
            className={`bg-gray-800 border border-cyan-400 text-cyan-400 cursor-pointer rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 ${
              page >= maxVisibleIndex
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-cyan-400 hover:text-black shadow-md"
            }`}
            variants={buttonVariants}
            initial="initial"
            whileHover={page < maxVisibleIndex ? "hover" : "disabled"}
            whileTap={page < maxVisibleIndex ? "tap" : "disabled"}
            disabled={page >= maxVisibleIndex}
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
            initial="animate"
            onMouseEnter={() => setIsAutoplayPaused(true)}
            onMouseLeave={() => {
              if (!isDragging) setIsAutoplayPaused(false);
            }}
          >
            <div className="flex">
              {cardsData.map((card, index) => (
                <motion.div
                  key={card.id}
                  className="flex-shrink-0"
                  style={{ width: `${100 / cardsPerView}%` }}
                  custom={index}
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  whileTap="tap"
                  onHoverStart={() => setIsHovered(index)}
                  onHoverEnd={() => setIsHovered(null)}
                  onClick={() => handleCardClick(card.id)}
                >
                  <div className="p-4 h-full">
                    <motion.div
                      className="relative bg-gray-800 border border-gray-700 rounded-2xl p-6 h-full flex flex-col overflow-hidden"
                      style={{
                        boxShadow:
                          isHovered === index
                          ? "0 20px 25px -5px rgba(6, 182, 212, 0.3), 0 10px 10px -5px rgba(6, 182, 212, 0.2)"
                          : "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    {card.discount > 0 && (
                      <motion.div 
                        className="absolute top-3 right-3 z-10 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full"
                        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, type: "spring" }}
                      >
                        {card.discount}% OFF
                      </motion.div>
                    )}

                    <motion.button
                      className="absolute top-3 left-3 z-10 bg-gray-700 border border-cyan-400 rounded-full p-2 shadow-md"
                      whileHover={{ scale: 1.1, backgroundColor: "#374151" }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => handleWishlist(e, card.id)}
                    >
                      <Heart size={18} className="text-cyan-400" />
                    </motion.button>

                    <div className="relative w-full h-48 mb-4 overflow-hidden rounded-xl">
                      <motion.div
                        transition={{ duration: 0.3 }}
                      >
                        <Image
                          src="/image1.jpg"
                          alt={card.title}
                          fill
                          style={{ objectFit: "cover" }}
                          className="transition-all duration-300"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          draggable="false"
                        />
                        
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 flex items-center justify-center"
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.span 
                            className="text-white font-bold text-lg"
                            initial={{ opacity: 0, y: 20 }}
                            whileHover={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                          >
                            View Product
                          </motion.span>
                        </motion.div>
                      </motion.div>
                    </div>
                    
                    <div className="flex items-center justify-end mb-2" >
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            className={`${
                              i < Math.floor(card.rating) 
                                ? "text-yellow-400 fill-yellow-400" 
                                : i < card.rating 
                                  ? "text-yellow-400 fill-yellow-400 opacity-50" 
                                  : "text-gray-500"
                            }`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-400 mr-1">
                        ({card.rating})
                      </span>
                    </div>
                  
                    <div className="flex flex-col flex-grow" >
                      <h3 className="text-lg font-bold text-white mb-1">
                        {card.title}
                      </h3>
                      <p className="text-gray-400 mb-2">{card.type}</p>
                      
                      <div className="mt-auto">
                        {card.discount > 0 ? (
                          <div className="flex flex-col items-end">
                            <p className="text-xs text-gray-500 line-through">
                              ${card.price}
                            </p>
                            <motion.p 
                              className="text-lg font-bold text-red-400"
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                            >
                              ${calculateDiscountedPrice(card.price, card.discount)}
                            </motion.p>
                          </div>
                        ) : (
                          <p className="text-lg font-bold text-white text-right">
                            ${card.price}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
                      <motion.button
                        className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => handlePhoneClick(e, card.id)}
                      >
                        <Phone size={20} className="text-cyan-400" />
                      </motion.button>
                      
                      <motion.button
                        className="flex items-center bg-cyan-400 text-black px-4 py-2 rounded-full text-sm font-medium"
                        whileHover={{ scale: 1.05, backgroundColor: "#22D3EE" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => handleAddToCart(e, card.id)}
                      >
                        <ShoppingCart size={16} className="ml-1" />
                        Add to Cart
                      </motion.button>
                    </div>
                    
                    <motion.div 
                      className="absolute top-0 left-0 w-16 h-16 bg-cyan-400 opacity-0"
                      style={{ clipPath: "polygon(0 0, 0% 100%, 100% 0)" }}
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <motion.button
          className="px-8 py-3 bg-gray-800 border-2 border-cyan-400 text-cyan-400 rounded-full font-medium hover:bg-cyan-400 hover:text-black transition-colors"
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0 10px 15px -3px rgba(6, 182, 212, 0.3), 0 4px 6px -2px rgba(6, 182, 212, 0.2)" 
          }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            console.log("View all products clicked");
          }}
        >
          View All Products
        </motion.button>
      </motion.div>
    </div>
  </section>
);
};

export default CardSlider;