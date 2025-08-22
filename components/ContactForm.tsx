"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker, {
  DateObject,
  DatePickerRef
} from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Calendar, ChevronDown } from "lucide-react";

const dropdownVariants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

const submitButtonVariants = {
  initial: { scale: 1, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

const selectContainerVariants = {
  focus: {
    boxShadow: "0 0 0 3px rgba(6, 182, 212, 0.3)",
    borderColor: "#06B6D4",
  },
  blur: {
    boxShadow: "0 0 0 0px rgba(6, 182, 212, 0)",
    borderColor: "#374151",
  },
};

export default function ContactForm() {
  const categories = [
    "PC Gaming",
    "Console Games",
    "Gaming Gear",
    "VR Gaming",
    "Esports",
    "Game Development",
    "Streaming Setup",
  ];

  const categoryToSkills: { [key: string]: string[] } = {
    "PC Gaming": [
      "Gaming PC Build",
      "Performance Optimization",
      "Hardware Upgrade",
      "Custom Builds",
    ],
    "Console Games": ["PlayStation Setup", "Xbox Configuration", "Nintendo Switch"],
    "Gaming Gear": ["Gaming Keyboards", "Gaming Mice", "Headsets", "Monitors"],
    "VR Gaming": ["VR Headset Setup", "VR Game Installation"],
    "Esports": ["Tournament Setup", "Team Coaching"],
    "Game Development": ["Unity Development", "Unreal Engine"],
    "Streaming Setup": ["OBS Configuration", "Stream Optimization"],
    default: ["Please select a category first"],
  };

  const persons: { [key: string]: string[] } = {
    "Gaming PC Build": ["Alex Chen", "Mike Rodriguez"],
    "Performance Optimization": ["Alex Chen", "Sarah Johnson"],
    "Hardware Upgrade": ["Mike Rodriguez", "Sarah Johnson"],
    "Custom Builds": ["Alex Chen"],
    "PlayStation Setup": ["David Kim", "Emma Wilson"],
    "Xbox Configuration": ["David Kim"],
    "Nintendo Switch": ["Sarah Johnson", "Emma Wilson"],
    "Gaming Keyboards": ["Sarah Johnson", "Lisa Thompson"],
    "Gaming Mice": ["Sarah Johnson"],
    "Headsets": ["Mike Rodriguez", "Lisa Thompson"],
    "Monitors": ["Alex Chen", "Mike Rodriguez"],
    "VR Headset Setup": ["Emma Wilson"],
    "VR Game Installation": ["Emma Wilson", "David Kim"],
    "Tournament Setup": ["Ryan Martinez"],
    "Team Coaching": ["Ryan Martinez", "Alex Chen"],
    "Unity Development": ["Lisa Thompson"],
    "Unreal Engine": ["Lisa Thompson", "David Kim"],
    "OBS Configuration": ["Ryan Martinez"],
    "Stream Optimization": ["Ryan Martinez", "Lisa Thompson"],
    default: ["Please select a service first"],
  };

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSkill, setSelectedSkill] = useState<string>("");
  const [selectedPerson, setSelectedPerson] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<DateObject | null>(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const [categoryFocused, setCategoryFocused] = useState(false);
  const [skillFocused, setSkillFocused] = useState(false);
  const [personFocused, setPersonFocused] = useState(false);

  const categoryRef = useRef<HTMLSelectElement>(null);
  const skillRef = useRef<HTMLSelectElement>(null);
  const personRef = useRef<HTMLSelectElement>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const datePickerCalendarRef = useRef<DatePickerRef>(null);

  const availableSkills = selectedCategory
    ? categoryToSkills[selectedCategory] || categoryToSkills.default
    : categoryToSkills.default;

  const availablePersons = selectedSkill
    ? persons[selectedSkill] || persons.default
    : persons.default;

  useEffect(() => {
    if (selectedCategory && skillRef.current) {
      skillRef.current.focus();
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedSkill && personRef.current) {
      personRef.current.focus();
    }
  }, [selectedSkill]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setIsDatePickerOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [datePickerRef]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setSelectedSkill("");
    setSelectedPerson("");
  };

  const handleSkillChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const skill = e.target.value;
    setSelectedSkill(skill);
    setSelectedPerson("");
  };

  const handleDateChange = (date: DateObject) => {
    setSelectedDate(date);
    setIsDatePickerOpen(false);
  };

  const formatDate = (date: DateObject | null) => {
    if (!date) return "Select Date";
    return `${date.day} ${date.month.name} ${date.year}`;
  };

  const handleOpenDatePicker = () => {
    setIsDatePickerOpen(true);

    setTimeout(() => {
      if (datePickerCalendarRef.current) {
        datePickerCalendarRef.current.openCalendar();
      }
    }, 0);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mx-auto mt-4 sm:mt-6 md:mt-8 py-4 sm:py-6 md:py-8 px-4 sm:px-6 md:px-8 lg:px-16 bg-gradient-to-b from-black to-gray-900"
    >
      <div className="flex flex-col items-center justify-center mb-4 sm:mb-6 md:mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-xl sm:text-2xl md:text-3xl text-cyan-400 mb-4 sm:mb-6"
        >
          Book Gaming Session
        </motion.h1>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 md:gap-6 lg:gap-12 mb-6 sm:mb-8">
        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={handleOpenDatePicker}
          className="w-full sm:w-auto text-base sm:text-lg md:text-xl bg-cyan-400 text-black rounded-full h-10 md:h-12 px-4 sm:px-6 md:px-8 mb-3 sm:mb-0 flex items-center justify-center font-medium"
        >
          <Calendar className="ml-2" size={18} />
          Select Date
        </motion.button>

        <motion.div
          
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full sm:w-auto text-base sm:text-lg md:text-xl bg-gray-800 border border-gray-700 text-gray-300 rounded-full h-10 md:h-12 px-4 sm:px-6 md:px-8 flex items-center justify-center"
        >
          {selectedDate ? formatDate(selectedDate) : "Choose your date"}
        </motion.div>

        <AnimatePresence>
          {isDatePickerOpen && (
            <motion.div
              ref={datePickerRef}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute mt-12 z-50"
            >
              <DatePicker
                ref={datePickerCalendarRef}
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
                value={selectedDate}
                onChange={handleDateChange}
                minDate={new DateObject({ calendar: persian }).add(1, "day")}
                maxDate={new DateObject({ calendar: persian }).add(90, "day")}
                className="custom-calendar"
                hideOnScroll
                onlyShowInRangeDates
                onOpen={() => {}}
                inputClass="hidden"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div
        className="flex flex-col md:flex-row justify-center gap-4 sm:gap-6 md:gap-10"
        
      >
        <motion.div
          variants={dropdownVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="w-full md:w-64 text-right mb-4 md:mb-0"
        >
          <label className="block text-cyan-400 font-semibold mb-2">
            Category
          </label>
          <motion.div
            className="relative"
            variants={selectContainerVariants}
            animate={categoryFocused ? "focus" : "blur"}
            transition={{ duration: 0.2 }}
          >
            <select
              ref={categoryRef}
              value={selectedCategory}
              onChange={handleCategoryChange}
              onFocus={() => setCategoryFocused(true)}
              onBlur={() => setCategoryFocused(false)}
              className="block w-full p-3 border border-gray-700 bg-gray-800 text-white rounded-md focus:outline-none appearance-none pr-4"
            >
              <option value="">Select...</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <motion.div
              className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
              animate={{ rotate: categoryFocused ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="text-cyan-400" size={18} />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={dropdownVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ delay: 0.1, duration: 0.3 }}
          className="w-full md:w-64 text-right mb-4 md:mb-0"
        >
          <label className="block text-cyan-400 font-semibold mb-2">
            Service
          </label>
          <motion.div
            className="relative"
            variants={selectContainerVariants}
            animate={skillFocused ? "focus" : "blur"}
            transition={{ duration: 0.2 }}
          >
            <select
              ref={skillRef}
              value={selectedSkill}
              onChange={handleSkillChange}
              onFocus={() => setSkillFocused(true)}
              onBlur={() => setSkillFocused(false)}
              className={`block w-full p-3 border border-gray-700 bg-gray-800 text-white rounded-md focus:outline-none appearance-none pr-4 ${
                !selectedCategory ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!selectedCategory}
            >
              <option value="">Select...</option>
              {availableSkills.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
            <motion.div
              className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
              animate={{ rotate: skillFocused ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="text-cyan-400" size={18} />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={dropdownVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ delay: 0.2, duration: 0.3 }}
          className="w-full md:w-64 text-right"
        >
          <label className="block text-cyan-400 font-semibold mb-2">
            Expert
          </label>
          <motion.div
            className="relative"
            variants={selectContainerVariants}
            animate={personFocused ? "focus" : "blur"}
            transition={{ duration: 0.2 }}
          >
            <select
              ref={personRef}
              value={selectedPerson}
              onChange={(e) => setSelectedPerson(e.target.value)}
              onFocus={() => setPersonFocused(true)}
              onBlur={() => setPersonFocused(false)}
              className={`block w-full p-3 border border-gray-700 bg-gray-800 text-white rounded-md focus:outline-none appearance-none pr-4 ${
                !selectedSkill ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!selectedSkill}
            >
              <option value="">Select...</option>
              {availablePersons.map((person) => (
                <option key={person} value={person}>
                  {person}
                </option>
              ))}
            </select>
            <motion.div
              className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
              animate={{ rotate: personFocused ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="text-cyan-400" size={18} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity:
            selectedCategory && selectedSkill && selectedPerson && selectedDate
              ? 1
              : 0,
          y:
            selectedCategory && selectedSkill && selectedPerson && selectedDate
              ? 0
              : 20,
        }}
        transition={{ duration: 0.3 }}
        className="flex justify-center mt-6 sm:mt-8"
      >
        <motion.button
          variants={submitButtonVariants}
          initial="initial"
          animate={
            selectedCategory && selectedSkill && selectedPerson && selectedDate
              ? "animate"
              : "initial"
          }
          whileHover="hover"
          whileTap="tap"
          className={`px-6 py-2 sm:py-3 rounded-full font-bold text-base sm:text-lg ${
            selectedCategory && selectedSkill && selectedPerson && selectedDate
              ? "bg-cyan-400 text-black hover:bg-cyan-300 cursor-pointer"
              : "bg-gray-600 text-gray-400 cursor-not-allowed"
          }`}
          disabled={
            !(
              selectedCategory &&
              selectedSkill &&
              selectedPerson &&
              selectedDate
            )
          }
        >
          Book Session
        </motion.button>
      </motion.div>

      <style jsx global>{`
        .custom-calendar {
          font-family: "Vazirmatn", sans-serif !important;
          box-shadow: 0 4px 20px rgba(6, 182, 212, 0.3);
          border-radius: 12px;
          padding: 16px;
          background-color: #1f2937;
          border: 1px solid #374151;
        }

        .custom-calendar .rmdp-day.rmdp-selected span {
          background-color: #06b6d4 !important;
          color: #000 !important;
        }

        .custom-calendar
          .rmdp-day:not(.rmdp-disabled):not(.rmdp-day-hidden)
          span:hover {
          background-color: rgba(6, 182, 212, 0.3) !important;
        }

        .custom-calendar .rmdp-arrow {
          border: solid #06b6d4;
          border-width: 0 2px 2px 0;
        }

        .custom-calendar .rmdp-week-day {
          color: #06b6d4;
          font-weight: bold;
        }

        .custom-calendar .rmdp-header-values {
          font-weight: bold;
          color: #f3f4f6;
        }

        .custom-calendar .rmdp-day span {
          color: #f3f4f6;
        }
      `}</style>
    </motion.section>
  );
}