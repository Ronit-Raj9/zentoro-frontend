"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Share, ImageIcon, Plus, BarChart3 } from "lucide-react"

interface ActionBarProps {
  onActionClick?: (action: string) => void
  onSendMessage?: (message: string) => void
  containerWidth?: number
}

export default function ActionBar({ onActionClick, onSendMessage, containerWidth = 800 }: ActionBarProps) {
  const [inputValue, setInputValue] = useState("")

  const actionButtons = [
    {
      id: "write-post",
      icon: Share,
      label: "Write Post",
      shortLabel: "Post",
      color: "bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30",
    },
    {
      id: "generate-image",
      icon: ImageIcon,
      label: "Generate Image",
      shortLabel: "Image",
      color: "bg-orange-500/20 text-orange-400 border-orange-500/30 hover:bg-orange-500/30",
    },
    {
      id: "add-task",
      icon: Plus,
      label: "Add Task",
      shortLabel: "Task",
      color: "bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30",
    },
    {
      id: "analytics",
      icon: BarChart3,
      label: "Analytics",
      shortLabel: "Stats",
      color: "bg-purple-500/20 text-purple-400 border-purple-500/30 hover:bg-purple-500/30",
    },
  ]

  const handleSendMessage = () => {
    if (!inputValue.trim()) return
    onSendMessage?.(inputValue)
    setInputValue("")
  }

  const handleActionClick = (actionId: string) => {
    onActionClick?.(actionId)
  }

  // Determine layout based on container width
  const isNarrow = containerWidth < 600
  const isVeryNarrow = containerWidth < 450
  const showLabels = containerWidth > 500

  // Show fewer buttons on very narrow screens
  const visibleButtons = isVeryNarrow ? actionButtons.slice(0, 2) : actionButtons

  return (
    <div className="w-full bg-gradient-to-t from-[#0a0b0f] via-[#0d0e11] to-transparent backdrop-blur-xl border-t border-white/5">
      {/* Action Buttons */}
      <div className={`px-6 py-6 ${isVeryNarrow ? "px-4" : ""}`}>
        <div
          className={`flex items-center justify-center mb-6 overflow-x-auto ${
            isVeryNarrow ? "space-x-2" : "space-x-3 sm:space-x-4"
          }`}
        >
          {visibleButtons.map((action) => {
            const IconComponent = action.icon
            return (
              <Button
                key={action.id}
                variant="outline"
                size="sm"
                onClick={() => handleActionClick(action.id)}
                className={`${action.color} border backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:shadow-lg flex-shrink-0 relative group ${
                  isVeryNarrow ? "px-3 py-2 h-10" : "px-4 py-3 h-12"
                }`}
              >
                <div className="relative z-10 flex items-center">
                  <IconComponent className={`${isVeryNarrow ? "h-4 w-4" : "h-5 w-5"} ${showLabels ? "mr-2" : ""} transition-transform group-hover:scale-110`} />
                  {showLabels && (
                    <span className={`font-medium ${isNarrow ? "text-sm" : "text-base"}`}>
                      {isNarrow ? action.shortLabel : action.label}
                    </span>
                  )}
                </div>
                {/* Button glow effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-current/10 to-current/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
              </Button>
            )
          })}

          {isVeryNarrow && (
            <Button
              variant="outline"
              size="sm"
              className="text-[#9ca3af] border-white/20 hover:bg-white/10 hover:border-[#7f5af0]/30 backdrop-blur-sm px-3 py-2 h-10 transition-all duration-300 hover:scale-110"
              title="More actions"
            >
              <span className="text-sm font-medium">+{actionButtons.length - 2}</span>
            </Button>
          )}
        </div>

        {/* Enhanced Input Section */}
        <div className={`flex items-center max-w-4xl mx-auto ${isVeryNarrow ? "space-x-3" : "space-x-4"}`}>
          <div className="flex-1 relative min-w-0">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder={
                isVeryNarrow
                  ? "Ask Toro..."
                  : isNarrow
                    ? "Ask Toro anything..."
                    : "Ask Toro anything... 'Write a post about startup challenges'"
              }
              className={`w-full bg-white/[0.03] backdrop-blur-md border-white/20 text-[#e6ebf4] placeholder:text-[#6b7280] rounded-xl focus:border-[#7f5af0]/50 focus:ring-2 focus:ring-[#7f5af0]/20 transition-all duration-300 hover:bg-white/[0.05] hover:border-white/30 ${
                isVeryNarrow ? "h-12 text-sm px-4" : "h-14 text-base px-5"
              }`}
            />
            {/* Input glow effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#7f5af0]/5 to-[#10b981]/5 opacity-0 focus-within:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
          </div>
          
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className={`bg-gradient-to-r from-[#7f5af0] via-[#8b5cf6] to-[#10b981] hover:from-[#7f5af0]/90 hover:via-[#8b5cf6]/90 hover:to-[#10b981]/90 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 relative group ${
              isVeryNarrow ? "h-12 px-4" : "h-14 px-6"
            }`}
          >
            <Send className={`${isVeryNarrow ? "h-4 w-4" : "h-5 w-5"} transition-transform group-hover:translate-x-0.5`} />
            {/* Send button glow */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#7f5af0]/20 to-[#10b981]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg -z-10" />
          </Button>
        </div>
      </div>
    </div>
  )
}
