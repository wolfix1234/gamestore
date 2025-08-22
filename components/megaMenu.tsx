"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
// ChevronDown
import Image from "next/image";

// Fake data structure for categories
interface SubCategory {
  id: number;
  name: string;
  slug: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  subCategories: SubCategory[];
}

// Sample data
const categories: Category[] = [
  {
    id: 1,
    name: "تجهیزات پزشکی",
    slug: "medical-equipment",
    image: "/image1.jpg",
    subCategories: [
      { id: 101, name: "فشارسنج", slug: "blood-pressure-monitor" },
      { id: 102, name: "گلوکومتر", slug: "glucometer" },
      { id: 103, name: "پالس اکسیمتر", slug: "pulse-oximeter" },
      { id: 104, name: "دماسنج", slug: "thermometer" },
    ],
  },
  {
    id: 2,
    name: "لوازم آزمایشگاهی",
    slug: "laboratory-equipment",
    image: "/image1.jpg",
    subCategories: [
      { id: 201, name: "میکروسکوپ", slug: "microscope" },
      { id: 202, name: "سانتریفیوژ", slug: "centrifuge" },
      { id: 203, name: "اتوکلاو", slug: "autoclave" },
    ],
  },
  {
    id: 3,
    name: "تجهیزات دندانپزشکی",
    slug: "dental-equipment",
    image: "/image1.jpg",
    subCategories: [
      { id: 301, name: "یونیت دندانپزشکی", slug: "dental-unit" },
      { id: 302, name: "توربین", slug: "turbine" },
      { id: 303, name: "آمالگاماتور", slug: "amalgamator" },
    ],
  },
  {
    id: 4,
    name: "تجهیزات بیمارستانی",
    slug: "hospital-equipment",
    image: "/image1.jpg",
    subCategories: [
      { id: 401, name: "تخت بیمارستانی", slug: "hospital-bed" },
      { id: 402, name: "ونتیلاتور", slug: "ventilator" },
      { id: 403, name: "مانیتور علائم حیاتی", slug: "vital-signs-monitor" },
    ],
  },
  {
    id: 5,
    name: "لوازم مصرفی پزشکی",
    slug: "medical-consumables",
    image: "/image1.jpg",
    subCategories: [
      { id: 501, name: "سرنگ", slug: "syringe" },
      { id: 502, name: "دستکش", slug: "gloves" },
      { id: 503, name: "ماسک", slug: "mask" },
      { id: 504, name: "گاز استریل", slug: "sterile-gauze" },
    ],
  },
];

interface MegaMenuProps {
  isOpen: boolean;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen }) => {
  const [activeCategory, setActiveCategory] = useState<number | null>(
    categories.length > 0 ? categories[0].id : null
  );

  const menuVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      height: 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      height: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: custom * 0.05,
      },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          
          className="absolute top-full left-0 right-0 w-full bg-white shadow-xl z-50"
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="container mx-auto py-6 px-4">
            <div className="flex flex-col md:flex-row">
              {/* Categories sidebar */}
              <div className="w-full md:w-1/4 border-b md:border-b-0 md:border-l border-gray-200 pb-4 md:pb-0 md:pl-4">
                <h3 className="text-lg font-bold text-pink-600 mb-4">
                  دسته‌بندی‌ها
                </h3>
                <ul className="space-y-2">
                  {categories.map((category, index) => (
                    <motion.li
                      key={category.id}
                      custom={index}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <button
                        className={`w-full text-right py-2 px-3 rounded-lg flex items-center justify-between transition-colors ${
                          activeCategory === category.id
                            ? "bg-pink-100 text-pink-600 font-bold"
                            : "hover:bg-gray-100"
                        }`}
                        onMouseEnter={() => setActiveCategory(category.id)}
                      >
                        <span>{category.name}</span>
                        <ChevronLeft
                          className={`w-4 h-4 transition-transform ${
                            activeCategory === category.id
                              ? "transform rotate-90"
                              : ""
                          }`}
                        />
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Subcategories and featured content */}
              <div className="w-full md:w-3/4 pt-4 md:pt-0 md:pr-4">
                {categories
                  .filter((category) => category.id === activeCategory)
                  .map((category) => (
                    <div
                      key={category.id}
                      className="flex flex-col md:flex-row"
                    >
                      {/* Subcategories */}
                      <div className="w-full md:w-2/3">
                        <h3 className="text-lg font-bold text-pink-600 mb-4">
                          {category.name}
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          {category.subCategories.map((subCategory, index) => (
                            <motion.div
                              key={subCategory.id}
                              custom={index}
                              variants={itemVariants}
                              initial="hidden"
                              animate="visible"
                            >
                              {/* you can costomize the link here  with /category/${category.slug}/${subCategory.slug}*/}
                              <Link
                                href={`/blog/sample`}
                                className="block py-2 px-3 rounded-lg hover:bg-pink-50 transition-colors"
                              >
                                {subCategory.name}
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                        <motion.div
                          className="mt-6"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                                                        {/* you can costomize the link here  with /category/${category.slug}*/}
                          <Link
                            href={`/blog/sample`}
                            className="inline-flex items-center text-pink-600 font-medium hover:text-pink-700"
                          >
                            <span>مشاهده همه {category.name}</span>
                            <ChevronLeft className="w-4 h-4 mr-1" />
                          </Link>
                        </motion.div>
                      </div>

                      {/* Featured image */}
                      <div className="w-full md:w-1/3 mt-6 md:mt-0">
                        <motion.div
                          className="rounded-lg overflow-hidden shadow-md"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <Image
                            src={category.image}
                            alt={category.name}
                            width={300}
                            height={200}
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-4 bg-gray-50">
                            <h4 className="font-bold text-pink-600">
                              محصولات ویژه {category.name}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              تخفیف ویژه محصولات {category.name} تا ۳۰٪
                            </p>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MegaMenu;
