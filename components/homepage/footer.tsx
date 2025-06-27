"use client"

import { Twitter, Linkedin, Github, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#0d0e11] border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-2xl">🐂</div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#7f5af0] to-[#10b981] bg-clip-text text-transparent">
                Zentoro
              </span>
            </div>
            <p className="text-[#9ca3af] text-sm leading-relaxed">
              Your AI-powered execution engine for founders. Focus. Create. Grow.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-[#e6ebf4] font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-[#9ca3af] hover:text-[#e6ebf4] text-sm transition-colors">
                  Focus Page
                </a>
              </li>
              <li>
                <a href="#agents" className="text-[#9ca3af] hover:text-[#e6ebf4] text-sm transition-colors">
                  Agent Marketplace
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-[#9ca3af] hover:text-[#e6ebf4] text-sm transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-[#9ca3af] hover:text-[#e6ebf4] text-sm transition-colors">
                  Roadmap
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[#e6ebf4] font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[#9ca3af] hover:text-[#e6ebf4] text-sm transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-[#9ca3af] hover:text-[#e6ebf4] text-sm transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-[#9ca3af] hover:text-[#e6ebf4] text-sm transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-[#9ca3af] hover:text-[#e6ebf4] text-sm transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-[#e6ebf4] font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[#9ca3af] hover:text-[#e6ebf4] text-sm transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-[#9ca3af] hover:text-[#e6ebf4] text-sm transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-[#9ca3af] hover:text-[#e6ebf4] text-sm transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#9ca3af] text-sm mb-4 md:mb-0">© 2024 Zentoro. All rights reserved.</p>

          <div className="flex space-x-4">
            <a href="#" className="text-[#9ca3af] hover:text-[#e6ebf4] transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-[#9ca3af] hover:text-[#e6ebf4] transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="text-[#9ca3af] hover:text-[#e6ebf4] transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-[#9ca3af] hover:text-[#e6ebf4] transition-colors">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
