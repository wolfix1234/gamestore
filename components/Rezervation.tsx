"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Rezervation() {
  return (
    <section className="bg-cyber-gradient p-4 md:p-8 lg:p-12 -mt-45 animate-fade-in">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 170"><path fill="pink" fillOpacity="1" d="M0,96L120,106.7C240,117,480,139,720,138.7C960,139,1200,117,1320,106.7L1440,96L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path></svg>
      <div className="max-w-6xl mx-auto mt-5">
        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative flex justify-center text-center text-white font-bold py-6 md:py-10 px-4 md:px-12 lg:px-20 
                    bg-[#BC0060] rounded-3xl md:rounded-4xl z-10"
        >
          <div className="text-2xl md:text-3xl lg:text-4xl pb-4 md:pb-8 lg:pb-10">
            تخفیف ویژه بگیرید
          </div>
        </motion.div>

        {/* Content Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col justify-center items-center py-8 md:py-12 lg:py-16 px-4 md:px-8 lg:px-16
                    mx-2 md:mx-6 lg:mx-12 bg-white rounded-3xl md:rounded-4xl z-20 -mt-4 md:-mt-6 lg:-mt-10
                    shadow-lg"
        >
          <h1 className="mb-4 md:mb-6 lg:mb-10 text-xl md:text-2xl lg:text-3xl text-[#BC0060] font-bold">
            !خدمات زیبایی شروع شد
          </h1>

          <p
            className="max-w-4xl text-center text-base md:text-lg text-gray-600 leading-relaxed"
            
          >
            در جشنواره بهاری سالن ما، با رزرو آنلاین خدماتی چون میکاپ، کاشت
            ناخن، کراتینه و پاکسازی پوست، تخفیف‌های شگفت‌انگیزی دریافت کنید. این
            پیشنهاد محدود، با هدف ارتقای تجربه شما از خدمات زیبایی ارائه می‌شود.
            همین حالا نوبت رزرو کنید و از فضایی آرام و حرفه‌ای با استفاده از
            متریال اصل و تکنیک‌های روز بهره‌مند شوید.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 md:mt-8 py-2 md:py-3 px-6 md:px-8 border-2 border-pink-600 hover:text-white hover:bg-pink-700 
                      rounded-full md:rounded-3xl text-pink-600 font-medium text-base md:text-lg
                      transition-colors duration-300 shadow-md"
          >
            نوبت بگیرید
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
