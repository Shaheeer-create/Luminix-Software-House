"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Menu, Info, Briefcase, FileText, BookOpen, HelpCircle, Users, Mail } from "lucide-react"
import { Orbitron } from 'next/font/google'
import Logo from '../../public/logo.png'
import { ModeToggle } from "./ModeToggle"

const orbitron = Orbitron({ subsets: ['latin'] })

const navItems = [
  { href: "/about", label: "About us", icon: Info },
  { href: "/services", label: "Services", icon: Briefcase },
  { href: "/case-studies", label: "Case Studies", icon: FileText },
  { href: "/blog", label: "Blog", icon: BookOpen },
  { href: "/how-it-works", label: "How it Works", icon: HelpCircle },
  { href: "/hire", label: "Hire", icon: Users },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/13379246173", "_blank")
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-md" 
          : "bg-white dark:bg-black"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={Logo}
            alt="Luxminix Logo"
            width={40}
            height={40}
            className="h-10 w-auto ml-10 -mt-3"
          />
          <span className={`text-xl ${orbitron.className} md:text-xl font-bold dark:text-white`}>
            Luxminix
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-base md:text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Section: Mode Toggle + Contact Button + Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <ModeToggle />

          {/* Contact Button */}
          <Button
            className="bg-gradient-to-tr from-[#6675F7] to-[#57007B] text-white rounded-lg px-6 text-base md:text-lg 
            transition-transform duration-200 ease-in-out hover:scale-105 "
            onClick={handleWhatsAppClick}
          >
            Contact us
          </Button>

          {/* Mobile Menu Button */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 dark:text-white" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DialogTrigger>

            {/* Mobile Menu Content */}
            <DialogContent className="sm:max-w-[425px] dark:bg-black dark:text-white">
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2 text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    <item.icon className="h-5 w-5 dark:text-white" />
                    {item.label}
                  </Link>
                ))}
                
                {/* Contact Button in Mobile Menu */}
                <Button
  className="bg-gradient-to-tr from-[#6675F7] to-[#57007B] text-white rounded-lg px-6 text-base md:text-lg 
  transition-all duration-300 ease-in-out hover:scale-110"
  onClick={handleWhatsAppClick}
>
  Contact us
</Button>

              </nav>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  )
}
