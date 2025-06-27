"use client"

import type React from "react"
import { useState } from "react"
import {
  Home,
  Target,
  Settings,
  User,
  ChevronDown,
  ChevronRight,
  Star,
  TrendingUp,
  Sparkles,
  Grid3X3,
  Wrench,
} from "lucide-react"

interface SidebarItem {
  id: string
  icon: React.ComponentType<{ className?: string }>
  label: string
  isActive?: boolean
  isHome?: boolean
  isUser?: boolean
  hasSubsections?: boolean
  subsections?: SubsectionItem[]
  gradient?: string
  bgColor?: string
  accentColor?: string
}

interface SubsectionItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

interface EnhancedSidebarProps {
  activeSection: string
  activeSubsection: string
  onSectionChange: (sectionId: string, subsectionId?: string) => void
}

export default function EnhancedSidebar({ activeSection, activeSubsection, onSectionChange }: EnhancedSidebarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [expandedSections, setExpandedSections] = useState<string[]>([])
  const [isHovered, setIsHovered] = useState(false)

  // Removed marketplace subsections

  const sidebarItems: SidebarItem[] = [
    {
      id: "home",
      icon: Home,
      label: "Back to Home",
      isHome: true,
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      accentColor: "emerald",
    },
    {
      id: "dashboard",
      icon: Grid3X3,
      label: "Dashboard",
      isActive: activeSection === "dashboard",
      gradient: "from-blue-500 via-indigo-500 to-purple-500",
      accentColor: "blue",
    },
    {
      id: "focus",
      icon: Target,
      label: "Focus Page",
      isActive: activeSection === "focus",
      gradient: "from-orange-500 via-red-500 to-pink-500",
      accentColor: "orange",
    },
    {
      id: "agent-builder",
      icon: Wrench,
      label: "Agent Builder",
      isActive: activeSection === "agent-builder",
      gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
      accentColor: "violet",
    },
    {
      id: "marketplace",
      icon: Grid3X3,
      label: "Marketplace",
      isActive: activeSection === "marketplace",
      gradient: "from-purple-500 via-violet-500 to-indigo-500",
      accentColor: "purple",
    },
    {
      id: "my-agents",
      icon: User,
      label: "My Agents",
      isActive: activeSection === "my-agents",
      gradient: "from-teal-500 via-green-500 to-emerald-500",
      accentColor: "teal",
    },
    {
      id: "settings",
      icon: Settings,
      label: "Settings",
      isActive: activeSection === "settings",
      gradient: "from-slate-500 via-gray-600 to-zinc-600",
      accentColor: "slate",
    },
  ]

  const handleItemClick = (item: SidebarItem) => {
    if (item.id === "home") {
      window.location.href = "/"
    } else if (item.id === "dashboard") {
      window.location.href = "/dashboard"
    } else if (item.id === "focus") {
      window.location.href = "/focus"
    } else if (item.id === "agent-builder") {
      window.location.href = "/agent-builder"
    } else if (item.id === "marketplace") {
      window.location.href = "/marketplace"
    } else if (item.id === "my-agents") {
      window.location.href = "/my-agents"
    } else if (item.id === "settings") {
      window.location.href = "/settings"
    } else if (!item.isUser) {
      onSectionChange(item.id)
    }
  }

  const handleSubsectionClick = (sectionId: string, subsectionId: string) => {
    if (sectionId === "marketplace") {
      window.location.href = "/marketplace"
    } else {
      onSectionChange(sectionId, subsectionId)
    }
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  return (
    <>
      {/* Backdrop overlay when expanded */}
      {isHovered && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 transition-opacity duration-300" />
      )}

      <div
        className={`relative h-screen transition-all duration-500 ease-out z-40 ${
          isHovered ? "w-[320px]" : "w-[80px]"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Glassmorphism background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1015]/95 via-[#1a1d29]/90 to-[#0f1015]/95 backdrop-blur-xl border-r border-white/10" />
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-blue-500/5 animate-pulse" />

        <div className="relative h-full flex flex-col py-6">
          {/* Enhanced Zentoro Logo */}
          <div className="px-4 mb-8 flex-shrink-0 flex justify-center">
            <div
              className="group/logo relative cursor-pointer"
              onMouseEnter={() => setHoveredItem("logo")}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 via-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold transition-all duration-300 group-hover/logo:rounded-xl group-hover/logo:scale-105 shadow-xl shadow-purple-500/25 ring-1 ring-white/20">
                <span className="group-hover/logo:scale-110 transition-transform duration-300 drop-shadow-lg flex items-center justify-center">🐂</span>
              </div>

              {/* Enhanced tooltip for collapsed state */}
              {!isHovered && hoveredItem === "logo" && (
                <div className="absolute left-20 top-1/2 transform -translate-y-1/2 z-50 animate-fadeIn">
                  <div className="bg-gray-900/95 backdrop-blur-sm text-white text-sm font-medium px-4 py-3 rounded-xl shadow-2xl border border-white/20 whitespace-nowrap">
                    <div className="font-semibold">AI Agent Studio</div>
                    <div className="text-gray-300 text-xs mt-1">Build • Deploy • Scale</div>
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 w-0 h-0 border-t-[6px] border-b-[6px] border-r-[8px] border-transparent border-r-gray-900/95"></div>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Studio Label - only visible when expanded */}
            {isHovered && (
              <div className="mt-4 opacity-0 animate-fadeIn" style={{ animationDelay: "200ms", animationFillMode: "forwards" }}>
                <h1 className="text-white font-bold text-xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  AI Agent Studio
                </h1>
                <div className="text-gray-400 text-sm font-medium mt-1 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  Build • Deploy • Scale
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Navigation Items */}
          <div className="flex-1 px-4 space-y-2 overflow-y-auto scrollbar-hide">
            {sidebarItems.map((item, index) => {
              const isActive = activeSection === item.id
              const isExpanded = expandedSections.includes(item.id)
              const IconComponent = item.icon

              return (
                <div key={item.id} className="relative">
                  {/* Enhanced tooltip - only show when sidebar is collapsed */}
                  {!isHovered && hoveredItem === item.id && (
                    <div className="absolute left-20 top-1/2 transform -translate-y-1/2 z-50 animate-fadeIn">
                      <div className="bg-gray-900/95 backdrop-blur-sm text-white text-sm font-medium px-4 py-3 rounded-xl shadow-2xl border border-white/20 whitespace-nowrap">
                        {item.label}
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 w-0 h-0 border-t-[6px] border-b-[6px] border-r-[8px] border-transparent border-r-gray-900/95"></div>
                      </div>
                    </div>
                  )}

                  {/* Enhanced Main Item */}
                  <div
                    className={`relative transition-all duration-300 cursor-pointer group ${
                      isHovered ? "flex items-center p-4 rounded-2xl" : "flex justify-center mb-3"
                    } ${
                      isActive && isHovered
                        ? "bg-gradient-to-r from-purple-600/20 to-indigo-600/20 text-white shadow-xl ring-1 ring-purple-500/30 backdrop-blur-sm"
                        : isHovered
                          ? "text-gray-300 hover:bg-white/5 hover:text-white hover:ring-1 hover:ring-white/10"
                          : ""
                    }`}
                    onClick={() => handleItemClick(item)}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Enhanced Icon Container */}
                    <div
                      className={`flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        isHovered
                          ? "w-8 h-8"
                          : `w-14 h-14 rounded-2xl hover:rounded-xl group-hover:scale-105 shadow-lg ${
                              isActive
                                ? "bg-gradient-to-br from-purple-500 to-indigo-600 shadow-purple-500/30 ring-2 ring-purple-400/50"
                                : "bg-gradient-to-br from-gray-600 to-gray-700 shadow-lg hover:shadow-xl ring-1 ring-white/20 hover:from-purple-500 hover:to-indigo-600"
                            }`
                      }`}
                    >
                      <IconComponent className={`text-white transition-all duration-300 ${isHovered ? "h-5 w-5" : "h-6 w-6"}`} />
                    </div>

                    {/* Enhanced Label and Expand Button */}
                    {isHovered && (
                      <div
                        className="ml-4 flex items-center justify-between w-full opacity-0 animate-fadeIn"
                        style={{ animationDelay: "150ms", animationFillMode: "forwards" }}
                      >
                        <span className="font-semibold whitespace-nowrap text-lg">{item.label}</span>
                        {item.hasSubsections && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleSection(item.id)
                            }}
                            className="p-2 hover:bg-white/10 rounded-xl transition-all duration-200 hover:scale-110"
                          >
                            {isExpanded ? (
                              <ChevronDown className="h-5 w-5 text-gray-400 transition-transform duration-200" />
                            ) : (
                              <ChevronRight className="h-5 w-5 text-gray-400 transition-transform duration-200" />
                            )}
                          </button>
                        )}
                      </div>
                    )}

                    {/* Active indicator line */}
                    {isActive && isHovered && (
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-purple-400 to-indigo-500 rounded-r-full"></div>
                    )}
                  </div>

                  {/* Enhanced Subsections */}
                  {item.hasSubsections && isExpanded && isHovered && (
                    <div
                      className="ml-8 mt-2 space-y-1 opacity-0 animate-fadeIn border-l border-white/10 pl-4"
                      style={{ animationDelay: "250ms", animationFillMode: "forwards" }}
                    >
                      {item.subsections?.map((subsection, subIndex) => {
                        const SubIcon = subsection.icon
                        const isSubActive = activeSection === item.id && activeSubsection === subsection.id

                        return (
                          <button
                            key={subsection.id}
                            onClick={() => handleSubsectionClick(item.id, subsection.id)}
                            className={`flex items-center w-full p-3 rounded-xl transition-all duration-300 text-sm group/sub relative ${
                              isSubActive
                                ? "bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-purple-300 ring-1 ring-purple-400/30 shadow-lg"
                                : "text-gray-400 hover:bg-white/5 hover:text-white hover:ring-1 hover:ring-white/10"
                            }`}
                            style={{ animationDelay: `${subIndex * 30}ms` }}
                          >
                            <div className={`p-1 rounded-lg mr-3 transition-all duration-200 ${
                              isSubActive 
                                ? "bg-purple-500/20" 
                                : "bg-white/5 group-hover/sub:bg-white/10"
                            }`}>
                              <SubIcon className="h-4 w-4 flex-shrink-0" />
                            </div>
                            <span className="whitespace-nowrap font-medium">{subsection.label}</span>
                            
                            {/* Subsection active indicator */}
                            {isSubActive && (
                              <div className="absolute right-3 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Enhanced User Avatar at Bottom */}
          <div className="px-6 mt-auto flex-shrink-0">
            <div className="relative group/user">
              {/* Enhanced tooltip for collapsed state */}
              {!isHovered && hoveredItem === "user" && (
                <div className="absolute left-20 bottom-0 transform translate-y-0 z-50 animate-fadeIn">
                  <div className="bg-gray-900/95 backdrop-blur-sm text-white text-sm font-medium px-4 py-3 rounded-xl shadow-2xl border border-white/20 whitespace-nowrap">
                    <div className="font-semibold flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      Ronit
                    </div>
                    <div className="text-gray-300 text-xs mt-1">Executive Coach • Online</div>
                    <div className="absolute left-0 bottom-4 transform -translate-x-2 w-0 h-0 border-t-[6px] border-b-[6px] border-r-[8px] border-transparent border-r-gray-900/95"></div>
                  </div>
                </div>
              )}

              <div
                className={`transition-all duration-300 cursor-pointer ${
                  isHovered ? "flex items-center p-4 rounded-2xl hover:bg-white/5 hover:ring-1 hover:ring-white/10" : "flex justify-center"
                }`}
                onMouseEnter={() => setHoveredItem("user")}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl hover:rounded-xl transition-all duration-300 flex items-center justify-center text-white text-xl font-bold shadow-xl shadow-emerald-500/25 ring-2 ring-white/20 hover:scale-105">
                    R
                  </div>
                  {/* Enhanced online status indicator */}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-[#0f1015] rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Enhanced User Info */}
                {isHovered && (
                  <div
                    className="ml-4 opacity-0 animate-fadeIn"
                    style={{ animationDelay: "150ms", animationFillMode: "forwards" }}
                  >
                    <div className="text-white text-lg font-semibold">Ronit</div>
                    <div className="text-gray-400 text-sm flex items-center font-medium">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      Executive Coach • Online
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
