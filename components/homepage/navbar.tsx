"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

interface NavbarProps {
  onLoginClick: () => void
  onSignupClick: () => void
}

export default function Navbar({ onLoginClick, onSignupClick }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0d0e11]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="text-2xl">🐂</div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#7f5af0] to-[#10b981] bg-clip-text text-transparent">
              Zentoro
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => (window.location.href = "/focus")}
              className="text-[#9ca3af] hover:text-[#e6ebf4] transition-colors"
            >
              Focus Page
            </button>
            <button
              onClick={() => scrollToSection("agents")}
              className="text-[#9ca3af] hover:text-[#e6ebf4] transition-colors"
            >
              Agent Marketplace
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-[#9ca3af] hover:text-[#e6ebf4] transition-colors"
            >
              Pricing
            </button>
            <Button variant="ghost" onClick={onLoginClick} className="text-[#e6ebf4] hover:bg-white/10">
              🔐 Login
            </Button>
            <Button
              onClick={onSignupClick}
              className="bg-gradient-to-r from-[#7f5af0] to-[#10b981] hover:from-[#7f5af0]/80 hover:to-[#10b981]/80 text-white font-medium"
            >
              🚀 Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => (window.location.href = "/focus")}
                className="text-[#9ca3af] hover:text-[#e6ebf4] transition-colors text-left"
              >
                Focus Page
              </button>
              <button
                onClick={() => scrollToSection("agents")}
                className="text-[#9ca3af] hover:text-[#e6ebf4] transition-colors text-left"
              >
                Agent Marketplace
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="text-[#9ca3af] hover:text-[#e6ebf4] transition-colors text-left"
              >
                Pricing
              </button>
              <Button variant="ghost" onClick={onLoginClick} className="text-[#e6ebf4] hover:bg-white/10 justify-start">
                🔐 Login
              </Button>
              <Button
                onClick={onSignupClick}
                className="bg-gradient-to-r from-[#7f5af0] to-[#10b981] hover:from-[#7f5af0]/80 hover:to-[#10b981]/80 text-white font-medium"
              >
                🚀 Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
