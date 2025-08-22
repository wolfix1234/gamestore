"use client";

import Image from 'next/image'
import React, { useEffect, useState, useRef } from "react";
import { motion, PanInfo, useMotionValue } from "framer-motion";

type Comment = {
  id: number;
  text: string;
  author?: string;
  role?: string;
  avatar?: string;
};

const comments: Comment[] = [
  {
    id: 1,
    text: "Amazing game selection! The latest releases are always available and the download speeds are incredible. Best gaming platform ever!",
    author: "Alex Chen",
    role: "Pro Gamer",
    avatar: "/image3.jpg",
  },
  {
    id: 2,
    text: "The VR gaming experience here is mind-blowing. Customer support is fantastic and they really know their games. Highly recommended!",
    author: "Sarah Johnson",
    role: "VR Enthusiast",
    avatar: "/image1.jpg",
  },
  {
    id: 3,
    text: "Best prices for gaming gear and the quality is top-notch. Fast delivery and excellent packaging. My go-to gaming store!",
    author: "Mike Rodriguez",
    role: "Esports Player",
    avatar: "/image2.jpg",
  },
  {
    id: 4,
    text: "The gaming community here is amazing. Great tournaments and events. Found my new favorite multiplayer games through their recommendations.",
    author: "Emma Wilson",
    role: "Casual Gamer",
    avatar: "/image1.jpg",
  },
  {
    id: 5,
    text: "Incredible selection of retro and modern games. The staff really understands gaming culture. This place is a gamer's paradise!",
    author: "David Kim",
    role: "Game Collector",
    avatar: "/image3.jpg",
  },
  {
    id: 6,
    text: "Lightning-fast service and competitive prices. The gaming setup advice I received was spot-on. Will definitely shop here again!",
    author: "Lisa Thompson",
    role: "Streamer",
    avatar: "/image1.jpg",
  },
  {
    id: 7,
    text: "From indie gems to AAA titles, they have everything. The pre-order system is seamless and I never miss a release date!",
    author: "Ryan Martinez",
    role: "Game Reviewer",
    avatar: "/image2.jpg",
  },
];

const CommentSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const [isDragging ,setIsDragging] = useState(false);
  console.log(isDragging);

  const [isHovering, setIsHovering] = useState(false);
  const [direction , setDirection] = useState(0);
  console.log(direction)

  const y = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const maxIndex = comments.length - 1;

  const getPrevIndex = () => (currentIndex > 0 ? currentIndex - 1 : maxIndex);
  const getNextIndex = () => (currentIndex < maxIndex ? currentIndex + 1 : 0);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex(getPrevIndex());
    setAutoSlide(false);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex(getNextIndex());
    setAutoSlide(false);
  };

  const handleDragStart = () => {
    setIsDragging(true);
    setAutoSlide(false);
  };

  const handleDragEnd = (
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setIsDragging(false);

    if (info.velocity.y < -500 || info.offset.y < -50) {
      setDirection(1);
      handleNext();
    } else if (info.velocity.y > 500 || info.offset.y > 50) {
      setDirection(-1);
      handlePrev();
    }

    const timer = setTimeout(() => setAutoSlide(true), 5000);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (autoSlide && !isHovering) {
      interval = setInterval(() => {
        setDirection(1);
        handleNext();
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [autoSlide, currentIndex, isHovering]);

  const renderCommentCard = (
    index: number,
    zIndex: number,
    scale: number,
    yOffset: number,
    opacity: number,
    isActive: boolean = false
  ) => {
    const comment = comments[index];
    return (
      <motion.div
        key={`card-${index}`}
        className="absolute inset-0"
        initial={false}
        animate={{
          scale,
          y: yOffset,
          zIndex,
          opacity,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          opacity: { duration: 0.2 },
        }}
      >
        <div
          className={`bg-gray-800 border border-gray-700 rounded-2xl shadow-xl p-8 text-right mx-auto h-full flex flex-col ${
            !isActive ? "filter blur-[1px]" : ""
          }`}
        >
          <svg
            className="w-10 h-10 text-cyan-400 opacity-30 mb-4"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>

          <p className="text-lg text-gray-300 mb-6 flex-grow">{comment.text}</p>

          <div className="flex items-center justify-start mt-auto">
            {comment.avatar && (
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-400 mr-4">
                <Image
                  src={comment.avatar}
                  alt={comment.author || "Gamer"}
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="text-right">
              <p className="font-bold text-white">
                {comment.author || "Gamer"}
              </p>
              <p className="text-sm text-cyan-400">{comment.role || ""}</p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section className="bg-gradient-to-t from-gray-900 to-black py-16" >
      <div className="max-w-4xl mx-auto text-center px-4" >
        <div className="flex items-center justify-between mb-12">
          <motion.h2
            className="text-3xl font-bold text-cyan-400"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Gamer Reviews
          </motion.h2>

          <div className="flex space-x-2">
            <motion.button
              onClick={handleNext}
              className="bg-gray-800 border border-cyan-400 text-xl rounded-full w-10 h-10 flex items-center justify-center shadow-md text-cyan-400 hover:bg-cyan-400 hover:text-black"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </motion.button>
            <motion.button
              onClick={handlePrev}
              className="bg-gray-800 border border-cyan-400 text-xl rounded-full w-10 h-10 flex items-center justify-center shadow-md text-cyan-400 hover:bg-cyan-400 hover:text-black"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </motion.button>
          </div>
        </div>

        <div
          className="relative h-[300px] mx-auto max-w-2xl overflow-visible perspective-1000"
          ref={containerRef}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {renderCommentCard(getPrevIndex(), 10, 0.92, -20, 0.6)}

          {renderCommentCard(getNextIndex(), 10, 0.92, 20, 0.6)}

          <motion.div
            className="absolute inset-0 cursor-grab active:cursor-grabbing z-30"
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.1}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            style={{ y }}
          >
            {renderCommentCard(currentIndex, 30, 1, 0, 1, true)}
          </motion.div>

          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-cyan-400 opacity-50 z-40">
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
              animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <path d="m18 15-6-6-6 6" />
            </motion.svg>
          </div>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-cyan-400 opacity-50 z-40">
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
              animate={{ y: [0, 5, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <path d="m6 9 6 6 6-6" />
            </motion.svg>
          </div>
        </div>

        <div className="w-full h-1 bg-gray-700 rounded-full mt-8 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
            initial={{ width: 0 }}
            animate={{
              width: `${((currentIndex + 1) / comments.length) * 100}%`,
            }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <div className="flex justify-center mt-6 space-x-2">
          {comments.map((_, index) => (
            <motion.button
              key={index}
              className="w-3 h-3 rounded-full bg-gray-600 focus:outline-none"
              initial={false}
              animate={{
                scale: currentIndex === index ? 1.2 : 1,
                backgroundColor: currentIndex === index ? "#06B6D4" : "#4B5563",
              }}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommentSlider;