"use client"

import { useState } from "react"
import Navbar from "@/components/homepage/navbar"
import HeroSection from "@/components/homepage/hero-section"
import FeaturesSection from "@/components/homepage/features-section"
import PricingSection from "@/components/homepage/pricing-section"
import Footer from "@/components/homepage/footer"
import AuthModal from "@/components/homepage/auth-modal"

export default function HomePage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup")

  const handleLoginClick = () => {
    setAuthMode("login")
    setIsAuthModalOpen(true)
  }

  const handleSignupClick = () => {
    setAuthMode("signup")
    setIsAuthModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsAuthModalOpen(false)
  }

  const handleModeChange = (mode: "login" | "signup") => {
    setAuthMode(mode)
  }

  return (
    <div className="min-h-screen bg-[#0d0e11]">
      <Navbar onLoginClick={handleLoginClick} onSignupClick={handleSignupClick} />

      <main>
        <HeroSection onLoginClick={handleLoginClick} onSignupClick={handleSignupClick} />
        <FeaturesSection />
        <PricingSection onSignupClick={handleSignupClick} />
      </main>

      <Footer />

      <AuthModal isOpen={isAuthModalOpen} onClose={handleCloseModal} mode={authMode} onModeChange={handleModeChange} />
    </div>
  )
}
