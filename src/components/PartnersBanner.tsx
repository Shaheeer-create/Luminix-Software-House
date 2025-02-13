"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import banner from "../../public/banner.png";

export default function PartnersSection() {
  return (
    <section className="w-full px-6 lg:px-16 py-24 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Left-aligned text */}
        <div className="text-left mb-16">
          <div className="w-20 h-1.5 bg-gradient-to-l from-[#F76680] to-[#57007B] mb-4"></div>
          <h2 className="text-4xl lg:text-5xl font-semibold text-gray-900 dark:text-white leading-snug">
            Meet the People
            <br />
            <span className="font-bold">We are Working With</span>
          </h2>
        </div>

        {/* Banner with continuous sliding animation */}
        <div className="relative overflow-hidden w-full">
          <motion.div
            className="flex space-x-8 w-max"
            animate={{ x: [0, "-50%"] }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          >
            <Image src={banner} alt="Partners" width={1600} height={400} className="w-full object-cover" />
            <Image src={banner} alt="Partners" width={1600} height={400} className="w-full object-cover" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
