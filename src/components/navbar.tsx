"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Menu, Info, Briefcase, FileText, BookOpen, HelpCircle, Users, Mail } from "lucide-react"
import { Orbitron } from 'next/font/google'
import Logo from '../../public/logo.png'

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

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-md" : "bg-white"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
          src={Logo}
            alt="Luxminix Logo"
            width={40}
            height={40}
            className="h-10 w-auto ml-10 -mt-3"
          />
          <span className={`text-xl ${orbitron.className} md:text-xl font-bold`}>Luxminix</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-base md:text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
        <Button
  className="bg-gradient-to-tr from-[#6675F7] to-[#57007B] hover:bg-[#5B32C2] text-white rounded-lg px-6 text-base md:text-lg"
  onClick={() => window.location.href = "mailto:luminixai12@gmail.com"}
>
  Contact us
</Button>


          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2 text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                ))}
                <Button
                  className="bg-[#6C3CE1] hover:bg-[#5B32C2] text-white rounded-lg px-6 mt-4 flex items-center gap-2 text-lg"
                  onClick={() => window.location.href = "mailto:luminixai12@gmail.com"}

                >
                  <Mail className="h-5 w-5" />
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

