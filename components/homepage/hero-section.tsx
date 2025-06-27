"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Brain, Target } from "lucide-react"

interface HeroSectionProps {
  onLoginClick: () => void
  onSignupClick: () => void
}

export default function HeroSection({ onLoginClick, onSignupClick }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#7f5af0]/10 via-transparent to-[#10b981]/10" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7f5af0]/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#10b981]/20 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Your{" "}
            <span className="bg-gradient-to-r from-[#7f5af0] to-[#10b981] bg-clip-text text-transparent">
              AI-Powered
            </span>
            <br />
            Execution Engine
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-[#9ca3af] mb-4 max-w-3xl mx-auto">
            Focus. Create. Grow. With Toro by your side.
          </p>

          <p className="text-lg text-[#9ca3af] mb-12 max-w-2xl mx-auto">
            Zentoro is where founders run their day — a smart terminal for tasks, agents, posts, and startup clarity.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              onClick={onSignupClick}
              size="lg"
              className="bg-gradient-to-r from-[#7f5af0] to-[#10b981] hover:from-[#7f5af0]/80 hover:to-[#10b981]/80 text-white font-medium text-lg px-8 py-4 h-auto"
            >
              🚀 Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              onClick={onLoginClick}
              variant="outline"
              size="lg"
              className="border-white/20 text-[#e6ebf4] hover:bg-white/10 text-lg px-8 py-4 h-auto"
            >
              🔒 Login
            </Button>
          </div>

          {/* Feature Preview Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
              <Brain className="h-8 w-8 text-[#7f5af0] mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Smart Focus</h3>
              <p className="text-[#9ca3af] text-sm">
                AI-powered task prioritization that adapts to your founder journey
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
              <Zap className="h-8 w-8 text-[#10b981] mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">AI Agents</h3>
              <p className="text-[#9ca3af] text-sm">Deploy specialized agents for content, analysis, and execution</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
              <Target className="h-8 w-8 text-[#facc15] mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Founder Rituals</h3>
              <p className="text-[#9ca3af] text-sm">Stay accountable with weekly reflections and progress tracking</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
