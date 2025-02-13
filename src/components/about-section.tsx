"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Play } from "lucide-react";
import { useRef, useState } from "react";
import RotatingText from "./ui/RotatingText";
import { Lobster } from "next/font/google";
import Link from "next/link";

const lobsterFont = Lobster({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

const AboutUs = "/video/aboutus.mp4";

export default function AboutSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Scroll animation setup
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const fadeInOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]); // Fade in
  const fadeInY = useTransform(scrollYProgress, [0, 1], [50, 0]); // Move up slightly

  const videoOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div ref={sectionRef} className="w-full px-6 lg:px-16 py-24 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left side text fade-in animation */}
        <motion.div style={{ opacity: fadeInOpacity, y: fadeInY }} transition={{ duration: 0.8, ease: "easeOut" }} className="space-y-8">
          <div className="space-y-6">
            <div className="w-20 h-1.5 bg-gradient-to-l from-[#F76680] to-[#57007B]"></div>
            <h2 className={`text-4xl lg:text-5xl font-semibold ${lobsterFont.className} text-gray-900 dark:text-white leading-snug`}>
              Leading companies trust us
              <br />
              to develop{" "}
              <span className="inline-block">
                <RotatingText
                  texts={["Product", "AI Agent", "ChatBot", "Custom Software"]}
                  mainClassName="inline-block text-black dark:text-black bg-gradient-to-l from-[#bfbfbf] to-[#ffffff] overflow-hidden py-1 sm:py-1.5 md:py-2 justify-center rounded-lg"
                  staggerFrom={"last"}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-1 sm:pb-1.5 md:pb-2"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2000}
                />
              </span>
            </h2>

            <p className="text-gray-600 dark:text-gray-300 text-lg lg:text-xl leading-relaxed">
              We <span className="bg-clip-text text-transparent bg-gradient-to-t from-[#F76680] to-[#57007B] font-semibold">add development capacity</span> to tech teams. Our value is not
              limited to building teams but is equally distributed across the project lifecycle. We are a custom
              software development company that guarantees the successful delivery of your project.
            </p>
          </div>
          <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
            <Link href="#" className="inline-flex items-center text-[#57007B] hover:text-purple-700 dark:hover:text-purple-300 font-semibold text-lg">
              See more Information
              <svg className="ml-2 w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right side video scroll animation */}
        <motion.div style={{ opacity: videoOpacity, scale: videoScale }} className="relative w-full">
          <div className="relative rounded-lg overflow-hidden w-full">
            <video ref={videoRef} src={AboutUs} className="w-full h-full object-cover" onClick={toggleVideo} />

            {/* Play/Pause Button - Hidden when playing */}
            {!isPlaying && (
              <motion.div
                className="absolute inset-0 bg-black/10 dark:bg-black/30 flex items-center justify-center cursor-pointer"
                whileHover={{ backgroundColor: "rgba(0,0,0,0.2)" }}
                transition={{ duration: 0.2 }}
                onClick={toggleVideo}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-16 h-16 rounded-full bg-white/20 dark:bg-white/30 backdrop-blur-sm flex items-center justify-center"
                >
                  <Play className="w-8 h-8 rounded-full bg-[#57007B] text-[#57007B]" fill="white" />
                </motion.div>
              </motion.div>
            )}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
