"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import HeroImage from '../../public/hero iamge.png'
import { Dancing_Script } from 'next/font/google'
import { Abril_Fatface } from 'next/font/google'
import { Barlow_Semi_Condensed } from 'next/font/google'
import { Cinzel } from 'next/font/google'



const abrilFont = Abril_Fatface({
    variable: "--font-abril-fatface",
    subsets: ["latin"],
    weight: "400"
})
const dancingScriptFont = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
})
const barlowFont = Barlow_Semi_Condensed({
  variable: "--font-barlow-semi-condensed",
  subsets: ["latin"],
  weight: "400"
})
const cinzelFont = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: "400"
})

export default function Hero() {
  return (
    <div className="container min-h-screen dark:bg-black flex items-center justify-center">
      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-center py-12">
        {/* Left Column - Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8 text-center lg:text-left"
        >
          <div className="space-y-4">
            <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
              <div className={`font-thin ${cinzelFont.className}`}>

                Great <span className={`bg-clip-text text-transparent bg-gradient-to-t from-[#DE4396] to-[#0D1C9F] ${dancingScriptFont.className}`}>Product</span> is
              </div>
              <br />
              <div className={`-mt-12 mb-8 ${barlowFont.className} font-bold`}>
                Built by great <span className={`bg-clip-text text-transparent bg-gradient-to-t from-[#F7666F] to-[#406AFF] ${abrilFont.className}`}>Teams</span>
              </div>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-gray-600 max-w-lg mx-auto lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              We help build and manage a team of world-class developers to bring your vision to life
            </motion.p>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <Button className="bg-[#3D63EA] hover:bg-[#3451E2] transition-all duration-300 text-white px-8 py-6 text-lg">
              Let&apos;s get started!
            </Button>
          </motion.div>
        </motion.div>

        {/* Right Column - Full Width Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative flex justify-end w-full"
        >
          <Image
            src={HeroImage}
            alt="Team collaboration illustration"
            layout="intrinsic"
            width={1000}
            height={600}
            className="w-full h-auto object-cover"
            priority
          />
        </motion.div>
      </div>
    </div>
  )
}
