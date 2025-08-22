'use client'

import { Phone, Map } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactWithUs() {
  return (
    <div
      className="flex flex-col md:flex-row gap-10 justify-center items-start max-w-7xl mx-auto mt-20 px-4 bg-gradient-to-b from-black to-gray-900 py-16"
      
    >
      {/* Form Section */}
      <motion.div
        className="w-full md:w-2/3 p-8 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <form className="space-y-4 text-right">
          <div>
            <label htmlFor="name" className="block font-bold text-cyan-400">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Enter your full name"
              className="mt-1 w-full px-4 py-2 bg-gray-700 border border-cyan-400 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent placeholder-gray-400"
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-bold text-cyan-400">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Enter your email address"
              className="mt-1 w-full px-4 py-2 bg-gray-700 border border-cyan-400 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent placeholder-gray-400"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block font-bold text-cyan-400">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              required
              placeholder="What can we help you with?"
              className="mt-1 w-full px-4 py-2 bg-gray-700 border border-cyan-400 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent placeholder-gray-400"
            />
          </div>

          <div>
            <label htmlFor="message" className="block font-bold text-cyan-400">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              placeholder="Tell us about your gaming needs..."
              className="mt-1 w-full px-4 py-2 bg-gray-700 border border-cyan-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent placeholder-gray-400"
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-cyan-400 text-black font-bold py-2 px-8 rounded-full hover:bg-cyan-300 transition duration-200 shadow-lg hover:shadow-cyan-400/25"
            >
              Send Message
            </button>
          </div>
        </form>
      </motion.div>

      {/* Contact Info + Map Section */}
      <motion.div
        className="flex flex-col gap-6 w-full md:w-2/3"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        <div className="w-full flex flex-col gap-6 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl p-6">
          {/* Address */}
          <div className="flex items-start gap-4 border-b-2 border-gray-700 pb-4">
            <Map className="w-6 h-6 text-cyan-400 mt-1" />
            <div>
              <h2 className="text-cyan-400 text-xl font-semibold">Store Location</h2>
              <p className="text-gray-300">
                Gaming District, Tech Plaza, Level 6 Unit 8, Cyber City
              </p>
            </div>
          </div>

          {/* Phone 1 */}
          <div className="flex justify-between items-center border-b-2 border-gray-700 pb-4">
            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-cyan-400 mt-1" />
              <div>
                <h2 className="text-cyan-400 text-xl font-semibold">Gaming Support</h2>
                <p className="text-gray-300">+1-800-GAMING</p>
              </div>
            </div>
            <button className="bg-cyan-400 text-black py-3 px-8 rounded-full font-medium hover:bg-cyan-300 transition-colors">
              24/7 Available
            </button>
          </div>

          {/* Phone 2 */}
          <div className="flex justify-between items-center border-b-2 border-gray-700 pb-4">
            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-cyan-400 mt-1" />
              <div>
                <h2 className="text-cyan-400 text-xl font-semibold">Tech Support</h2>
                <p className="text-gray-300">+1-800-TECHHELP</p>
              </div>
            </div>
            <button className="bg-cyan-400 text-black py-3 px-8 rounded-full font-medium hover:bg-cyan-300 transition-colors">
              9 AM - 11 PM
            </button>
          </div>
        </div>

        {/* Google Map */}
        <motion.div
          className="relative overflow-hidden pt-[56.25%] rounded-lg border border-gray-700"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        >
          <iframe
            src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=%C4%B0zmir+(Gaming%20Store)&ie=UTF8&t=&z=14&iwloc=B&output=embed"
            frameBorder="0"
            title="Gaming Store Location"
            className="absolute top-0 left-0 w-full h-full rounded-lg filter brightness-75 contrast-125"
            allowFullScreen
          ></iframe>
          <div className="absolute inset-0 bg-cyan-400 opacity-10 pointer-events-none"></div>
        </motion.div>
      </motion.div>
    </div>
  );
}