"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useAnimation, useDragControls } from "framer-motion";
import {
  FaInstagram,
  FaTelegram,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactNode;
}

interface TeamMember {
  name: string;
  title: string;
  description: string;
  image: string;
  socialLinks: SocialLink[];
}

const teamMembers: TeamMember[] = [
  {
    name: "Alex Chen",
    title: "Gaming Hardware Specialist",
    description:
      "Alex Chen has over 10 years of experience in gaming hardware optimization and custom PC builds for professional gamers.",
    image: "/image1.jpg",
    socialLinks: [
      {
        platform: "Instagram",
        url: "https://instagram.com",
        icon: <FaInstagram size={20} />,
      },
      {
        platform: "Telegram",
        url: "https://telegram.org",
        icon: <FaTelegram size={20} />,
      },
      {
        platform: "Twitter",
        url: "https://twitter.com",
        icon: <FaTwitter size={20} />,
      },
    ],
  },
  {
    name: "Sarah Johnson",
    title: "VR Gaming Expert",
    description:
      "Sarah Johnson is a VR gaming specialist with expertise in virtual reality setup and immersive gaming experiences.",
    image: "/image2.jpg",
    socialLinks: [
      {
        platform: "Instagram",
        url: "https://instagram.com",
        icon: <FaInstagram size={20} />,
      },
      {
        platform: "LinkedIn",
        url: "https://linkedin.com",
        icon: <FaLinkedin size={20} />,
      },
    ],
  },
  {
    name: "Mike Rodriguez",
    title: "Esports Coach",
    description:
      "Mike Rodriguez is a professional esports coach specializing in competitive gaming strategies and team training with 8 years of experience.",
    image: "/image3.jpg",
    socialLinks: [
      {
        platform: "Instagram",
        url: "https://instagram.com",
        icon: <FaInstagram size={20} />,
      },
      {
        platform: "Telegram",
        url: "https://telegram.org",
        icon: <FaTelegram size={20} />,
      },
    ],
  },
  {
    name: "Emma Wilson",
    title: "Game Developer",
    description:
      "Emma Wilson is a game developer with 6 years of experience in Unity and Unreal Engine, creating immersive gaming experiences.",
    image: "/image1.jpg",
    socialLinks: [
      {
        platform: "Instagram",
        url: "https://instagram.com",
        icon: <FaInstagram size={20} />,
      },
      {
        platform: "WhatsApp",
        url: "https://whatsapp.com",
        icon: <FaWhatsapp size={20} />,
      },
    ],
  },
  {
    name: "David Kim",
    title: "Streaming Specialist",
    description:
      "David Kim specializes in streaming setup and content creation, helping gamers build professional streaming environments.",
    image: "/image2.jpg",
    socialLinks: [
      {
        platform: "Instagram",
        url: "https://instagram.com",
        icon: <FaInstagram size={20} />,
      },
      {
        platform: "YouTube",
        url: "https://youtube.com",
        icon: <FaYoutube size={20} />,
      },
    ],
  },
  {
    name: "Lisa Thompson",
    title: "Gaming Gear Expert",
    description:
      "Lisa Thompson is an expert in gaming peripherals and accessories with over 5 years of experience in professional gaming gear.",
    image: "/image3.jpg",
    socialLinks: [
      {
        platform: "Instagram",
        url: "https://instagram.com",
        icon: <FaInstagram size={20} />,
      },
      {
        platform: "Telegram",
        url: "https://telegram.org",
        icon: <FaTelegram size={20} />,
      },
    ],
  },
];

const TeamMembers: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(3);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const controls = useAnimation();
  const dragControls = useDragControls();
  const containerRef = useRef<HTMLDivElement>(null);

  const maxIndex = Math.max(0, teamMembers.length - visibleItems);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1);
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2);
      } else {
        setVisibleItems(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!isAutoplayPaused && !isDragging) {
      interval = setInterval(() => {
        if (currentIndex < maxIndex) {
          handleNext();
        } else {
          setCurrentIndex(0);
          controls.start({ x: 0 });
        }
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [currentIndex, maxIndex, isAutoplayPaused, isDragging, controls]);

  useEffect(() => {
    if (containerRef.current) {
      const slideWidth = containerRef.current.offsetWidth / visibleItems;
      controls.start({
        x: -currentIndex * slideWidth,
        transition: { type: "spring", stiffness: 300, damping: 30 },
      });
    }
  }, [currentIndex, visibleItems, controls]);

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsAutoplayPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);

    const distance = touchStart - e.targetTouches[0].clientX;

    if (containerRef.current) {
      const slideWidth = containerRef.current.offsetWidth / visibleItems;

      let newX = -currentIndex * slideWidth - distance;

      if (currentIndex === 0 && distance < 0) {
        newX = -distance * 0.3;
      } else if (currentIndex === maxIndex && distance > 0) {
        newX = -currentIndex * slideWidth - distance * 0.3;
      }

      controls.set({ x: newX });
    }
  };

  const handleTouchEnd = () => {
    setIsAutoplayPaused(false);

    if (containerRef.current) {
      const slideWidth = containerRef.current.offsetWidth / visibleItems;

      const minSwipeDistance = 50;
      const distance = touchStart - touchEnd;

      if (distance > minSwipeDistance && currentIndex < maxIndex) {
        handleNext();
      } else if (distance < -minSwipeDistance && currentIndex > 0) {
        handlePrev();
      } else {
        controls.start({
          x: -currentIndex * slideWidth,
          transition: { type: "spring", stiffness: 300, damping: 30 },
        });
      }
    }
  };

  const handleDragStart = (e: React.MouseEvent) => {
    setIsDragging(true);
    setIsAutoplayPaused(true);
    setDragStartX(e.clientX);
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
  };

  const handleDragMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const distance = dragStartX - e.clientX;
    const slideWidth = containerRef.current.offsetWidth / visibleItems;
    
    let newX = -currentIndex * slideWidth - distance;

    if (currentIndex === 0 && distance < 0) {
      newX = -distance * 0.3;
    } else if (currentIndex === maxIndex && distance > 0) {
      newX = -currentIndex * slideWidth - distance * 0.3;
    }

    controls.set({ x: newX });
  };

  const handleDragEnd = (e: MouseEvent) => {
    setIsDragging(false);
    setIsAutoplayPaused(false);
    
    document.removeEventListener('mousemove', handleDragMove);
    document.removeEventListener('mouseup', handleDragEnd);

    if (!containerRef.current) return;
    
    const slideWidth = containerRef.current.offsetWidth / visibleItems;
    const distance = dragStartX - e.clientX;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance && currentIndex < maxIndex) {
      handleNext();
    } else if (distance < -minSwipeDistance && currentIndex > 0) {
      handlePrev();
    } else {
      controls.start({
        x: -currentIndex * slideWidth,
        transition: { type: "spring", stiffness: 300, damping: 30 },
      });
    }
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-black to-gray-900 relative">
  <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-500/20 rounded-full opacity-30 blur-xl"></div>
  <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500/20 rounded-full opacity-30 blur-xl"></div>

  <div className="max-w-6xl mx-auto relative">
    <motion.div
      className="text-center mb-12 relative z-10"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
    >
      <motion.span
        className="inline-block px-4 py-1.5 bg-gray-800 border border-cyan-400 text-cyan-400 rounded-full text-sm font-medium mb-3"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        viewport={{ once: true }}
      >
        Our Team
      </motion.span>
      <div className="relative">
        <h2
          className="text-3xl md:text-4xl font-bold text-cyan-400 mb-4"
          
        >
          Gaming Experts
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto" >
          Meet our professional team of gaming experts. We proudly provide high-quality gaming services to you.
        </p>
      </div>

      <motion.div
        className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-6 rounded-full"
        initial={{ width: 0 }}
        whileInView={{ width: 96 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        viewport={{ once: true }}
      />
    </motion.div>

        <div className="relative overflow-hidden">
          <motion.div
            ref={containerRef}
            className="overflow-hidden cursor-grab"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleDragStart}
            onMouseEnter={() => setIsAutoplayPaused(true)}
            onMouseLeave={() => {
              if (!isDragging) setIsAutoplayPaused(false);
            }}
            style={{ touchAction: "pan-y" }}
          >
            <motion.div
              className="flex gap-8"
              animate={controls}
              initial={{ x: 0 }}
              drag="x"
              dragConstraints={{ left: -maxIndex * (containerRef.current?.offsetWidth || 0) / visibleItems, right: 0 }}
              dragElastic={0.1}
              dragControls={dragControls}
              onDragStart={() => {
                setIsDragging(true);
                setIsAutoplayPaused(true);
              }}
              onDragEnd={(e, info) => {
                setIsDragging(false);
                setIsAutoplayPaused(false);
                
                if (containerRef.current) {
                  const slideWidth = containerRef.current.offsetWidth / visibleItems;
                  const dragDistance = info.offset.x;
                  const draggedSlides = Math.round(dragDistance / slideWidth);
                  
                  let newIndex = currentIndex - draggedSlides;
                  newIndex = Math.max(0, Math.min(newIndex, maxIndex));
                  
                  setCurrentIndex(newIndex);
                }
              }}
            >
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  className={`flex-none ${
                    visibleItems === 1
                      ? "w-full"
                      : visibleItems === 2
                      ? "w-[calc(50%-1rem)]"
                      : "w-[calc(33.333%-1.33rem)]"
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: Math.min(index * 0.1, 0.3),
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                  onHoverStart={() => setActiveCard(index)}
                  onHoverEnd={() => setActiveCard(null)}
                >
                  <motion.div
                    className="relative bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl overflow-visible p-6 pt-20 mt-16 h-full"
                    whileHover={{
                      y: -8,
                      boxShadow:
                        "0 20px 40px -5px rgba(6, 182, 212, 0.3), 0 10px 15px -5px rgba(6, 182, 212, 0.2)",
                      backgroundColor: "#1f2937",
                      borderColor: "#06B6D4",
                      transition: { duration: 0.3 },
                    }}
                  >
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-t-2xl"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      viewport={{ once: true }}
                    />

                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                      <motion.div
                        className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-700 shadow-lg"
                        initial={{ scale: 0.8, opacity: 0, y: 20 }}
                        whileInView={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                          delay: 0.2,
                        }}
                        whileHover={{
                          scale: 1.05,
                          borderColor: "#06B6D4",
                          transition: { duration: 0.2 },
                        }}
                        viewport={{ once: true }}
                      >
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          style={{ objectFit: "cover" }}
                          sizes="128px"
                        />

                        <motion.div
                          className="absolute inset-0 border-4 border-cyan-400 rounded-full"
                          initial={{ opacity: 0 }}
                          whileHover={{
                            opacity: 1,
                            scale: 1.1,
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                    </div>

                    <div className="text-center mb-6" >
                      <motion.h3
                        className="text-xl font-bold text-white mb-1"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                      >
                        {member.name}
                      </motion.h3>
                      <motion.p
                        className="text-cyan-400 font-medium"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                      >
                        {member.title}
                      </motion.p>
                    </div>

                    <motion.div
                      className="mb-6 text-gray-300 text-sm text-center"
                      
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <p>{member.description}</p>
                    </motion.div>

                    <motion.div
                      className="border-t border-gray-700 my-4"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      viewport={{ once: true }}
                    />

                    <div
                      className="flex items-center justify-between"
                      
                    >
                      <span className="text-gray-300 font-medium text-sm">
                        Social Networks:
                      </span>
                      <div className="flex gap-3">
                        {member.socialLinks.map((link, idx) => (
                          <motion.a
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-cyan-400 transition-colors p-2 rounded-full hover:bg-gray-700"
                            whileHover={{
                              scale: 1.2,
                              backgroundColor: "#374151",
                              color: "#06B6D4",
                            }}
                            whileTap={{ scale: 0.9 }}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + idx * 0.1 }}
                            viewport={{ once: true }}
                          >
                            {link.icon}
                          </motion.a>
                        ))}
                      </div>
                    </div>

                    <motion.div
                      className="absolute -bottom-3 left-0 right-0 flex justify-center opacity-0 transform translate-y-4 transition-all duration-300"
                      style={{
                        opacity: activeCard === index ? 1 : 0,
                        transform:
                          activeCard === index
                            ? "translateY(0)"
                            : "translateY(1rem)",
                      }}
                    >
                      <motion.button
                        className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black px-5 py-2 rounded-full text-sm font-medium shadow-lg"
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0 10px 25px -5px rgba(6, 182, 212, 0.4)",
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Profile
                      </motion.button>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TeamMembers;