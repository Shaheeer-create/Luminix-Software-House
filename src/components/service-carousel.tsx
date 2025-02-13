"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { Code2, Smartphone, TestTubes, Settings } from "lucide-react"
import TrueFocus from './ui/TrueFocus';

const services = [
  {
    icon: Code2,
    title: "Web Design & Development",
    description: "A Website is an extension of yourself and we can help you to express it properly.",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Your website is your number one marketing asset because we live in a digital age.",
  },
  {
    icon: TestTubes,
    title: "Software Testing Service",
    description: "We ensure software meets all quality standards before deployment.",
  },
  {
    icon: Settings,
    title: "IT Solutions & Consultancy",
    description: "Providing cutting-edge solutions tailored to your business needs.",
  },
]

/*************  ✨ Codeium Command ⭐  *************/
/**
 * ServicesCarousel is a component that displays a carousel of service offerings.
 * It utilizes motion animations and transitions to provide a smooth scrolling experience.
 *
 * The carousel highlights a selected service by centering it and adjusting its style.
 * The user can navigate through the services using navigation dots.
 *
 * Hooks:
 * - useState: Manages the index of the active service.
 * - useRef: Provides a reference to the container element for measuring its width.
 * - useAnimation: Controls the animation of the carousel.
 * - useEffect: Adjusts the carousel's scroll position on mount and window resize.
 *
 * Props:
 * - None
 * 
 * Usage:
 * - Render this component to display a scrollable carousel of services with animations.
 * - Customize the styles and animations as needed.
 */

/******  a13d3a35-0eda-4904-936a-dbc4ad43ac32  *******/export default function ServicesCarousel() {
  const [activeIndex, setActiveIndex] = useState(1) // Starts from 1 (for 1-4 instead of 0-3)
  const containerRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const cardWidth = 400
  const gap = 24

  useEffect(() => {
    const centerSelectedService = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const scrollPosition = (activeIndex - 1) * (cardWidth + gap) - (containerWidth - cardWidth) / 2
        controls.start({ x: -scrollPosition })
      }
    }

    centerSelectedService()
    window.addEventListener("resize", centerSelectedService)

    return () => {
      window.removeEventListener("resize", centerSelectedService)
    }
  }, [activeIndex, controls])

  return (
    <div className="w-full bg-gray-100 dark:bg-black py-12 overflow-hidden">
      <TrueFocus 
        sentence="Services we offer"
        manualMode={false}
        blurAmount={5}
        borderColor="red"
        animationDuration={2}
        pauseBetweenAnimations={1}
      />

      <h2 className="text-2xl font-bold text-center mb-12 text-gray-900 dark:text-white"></h2>

      <div className="relative overflow-hidden">
        <motion.div
          ref={containerRef}
          className="flex cursor-pointer"
          animate={controls}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {services.map((service, index) => {
            const serviceIndex = index + 1 // Convert 0-based to 1-based index
            return (
              <motion.div
                key={serviceIndex}
                className={`flex-shrink-0 w-[400px] mr-6 p-8 rounded-2xl transition-all duration-300 cursor-pointer
                  ${serviceIndex === activeIndex ? "border-2 border-t-4 border-purple-500 scale-105" : "border border-t-4 border-transparent"}
                  hover:border-2 hover:border-t-4 hover:border-purple-500 hover:shadow-lg hover:-translate-y-1
                  bg-white dark:bg-black dark:border-gray-700
                  min-h-[300px] relative before:content-[''] before:absolute before:top-0 before:left-4 before:right-4 before:h-1
                  before:bg-purple-500 before:transform before:scale-x-0 before:transition-transform before:duration-300
                  hover:before:scale-x-100`}
                onClick={() => setActiveIndex(serviceIndex)} // Set active on click
              >
                <div className="flex flex-col items-start gap-4 h-full">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-600 
                    transition-all duration-300 group-hover:border-purple-300 group-hover:bg-purple-50 dark:group-hover:bg-purple-900"
                  >
                    <service.icon className="w-8 h-8 text-purple-600 dark:text-purple-400 transition-all duration-300 group-hover:scale-110" />
                  </div>
                  <h3 className={`text-xl font-semibold transition-all duration-300
                    ${serviceIndex === activeIndex ? "text-purple-600 dark:text-purple-400" : "text-gray-900 dark:text-white"}
                    group-hover:text-purple-600 dark:group-hover:text-purple-400`}
                  >
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-all duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-200">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      <div className="flex items-center justify-center gap-8 mt-8">
        <div className="flex items-center gap-2">
          {services.map((_, index) => {
            const serviceIndex = index + 1
            return (
              <button
                key={serviceIndex}
                onClick={() => setActiveIndex(serviceIndex)}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer 
                  ${serviceIndex === activeIndex ? "bg-purple-600 scale-125 dark:bg-purple-400" : "bg-gray-300 dark:bg-gray-600"}
                  hover:bg-purple-400 dark:hover:bg-purple-500`}
                aria-label={`Go to slide ${serviceIndex}`}
              />
            )
          })}
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-purple-600 dark:text-purple-400 font-medium">{String(activeIndex).padStart(2, "0")}</span>
          <div className="w-12 h-0.5 bg-gray-200 dark:bg-gray-700 relative">
            <motion.div
              className="absolute top-0 left-0 h-full bg-purple-600 dark:bg-purple-400"
              initial={false}
              animate={{ width: `${(activeIndex / services.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <span className="text-gray-400 dark:text-gray-500">{String(services.length).padStart(2, "0")}</span>
        </div>
      </div>
    </div>
  )
}
