"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Github, Linkedin, Mail } from "lucide-react"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  mode: "login" | "signup"
  onModeChange: (mode: "login" | "signup") => void
}

export default function AuthModal({ isOpen, onClose, mode, onModeChange }: AuthModalProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
    goal: "",
    helpWith: "",
  })

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle authentication logic here
    console.log("Auth submission:", { mode, formData })
  }

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <Card className="relative w-full max-w-md bg-[#0d0e11] border-white/20">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-0 top-0 text-[#9ca3af] hover:text-[#e6ebf4]"
          >
            <X className="h-4 w-4" />
          </Button>

          <CardTitle className="text-2xl font-bold text-center">
            {mode === "login" ? "Welcome Back" : "Join Zentoro"}
          </CardTitle>
          <p className="text-[#9ca3af] text-center">
            {mode === "login" ? "Sign in to your execution engine" : "Start your founder journey with AI"}
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Social Login Buttons */}
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full border-white/20 text-[#e6ebf4] hover:bg-white/10"
              onClick={() => handleSocialLogin("google")}
            >
              <Mail className="mr-2 h-4 w-4" />
              Continue with Google
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="border-white/20 text-[#e6ebf4] hover:bg-white/10"
                onClick={() => handleSocialLogin("github")}
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
              <Button
                variant="outline"
                className="border-white/20 text-[#e6ebf4] hover:bg-white/10"
                onClick={() => handleSocialLogin("linkedin")}
              >
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-[#0d0e11] px-2 text-[#9ca3af]">or continue with email</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#e6ebf4]">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="founder@startup.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-white/5 border-white/20 text-[#e6ebf4] placeholder:text-[#9ca3af]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#e6ebf4]">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="bg-white/5 border-white/20 text-[#e6ebf4] placeholder:text-[#9ca3af]"
                required
              />
            </div>

            {/* Signup Additional Fields */}
            {mode === "signup" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-[#e6ebf4]">
                    What's your role?
                  </Label>
                  <select
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-md text-[#e6ebf4] focus:outline-none focus:ring-2 focus:ring-[#7f5af0]"
                    required
                  >
                    <option value="">Select your role</option>
                    <option value="founder">Founder</option>
                    <option value="marketer">Marketer</option>
                    <option value="designer">Designer</option>
                    <option value="developer">Developer</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goal" className="text-[#e6ebf4]">
                    What's your main goal right now?
                  </Label>
                  <select
                    id="goal"
                    value={formData.goal}
                    onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-md text-[#e6ebf4] focus:outline-none focus:ring-2 focus:ring-[#7f5af0]"
                    required
                  >
                    <option value="">Select your goal</option>
                    <option value="mvp">Build MVP</option>
                    <option value="funding">Raise Funding</option>
                    <option value="growth">Scale & Growth</option>
                    <option value="launch">Product Launch</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#7f5af0] to-[#10b981] hover:from-[#7f5af0]/80 hover:to-[#10b981]/80 text-white font-medium"
            >
              {mode === "login" ? "Sign In" : "Create Account"}
            </Button>
          </form>

          {/* Mode Switch */}
          <div className="text-center">
            <p className="text-[#9ca3af]">
              {mode === "login" ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => onModeChange(mode === "login" ? "signup" : "login")}
                className="text-[#7f5af0] hover:text-[#7f5af0]/80 font-medium"
              >
                {mode === "login" ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
