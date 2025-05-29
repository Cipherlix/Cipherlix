"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/20 dark:border-gray-700/20 transition-all duration-300">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Cipherlix
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#about"
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-accent transition-colors"
            >
              About
            </a>
            <a
              href="#services"
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-accent transition-colors"
            >
              Services
            </a>
            <a
              href="#projects"
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-accent transition-colors"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-accent transition-colors"
            >
              Contact
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="relative overflow-hidden group">
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200/20 dark:border-gray-700/20">
            <div className="flex flex-col space-y-4 pt-4">
              <a
                href="#about"
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-accent transition-colors"
              >
                About
              </a>
              <a
                href="#services"
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-accent transition-colors"
              >
                Services
              </a>
              <a
                href="#projects"
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-accent transition-colors"
              >
                Projects
              </a>
              <a
                href="#contact"
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-accent transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
