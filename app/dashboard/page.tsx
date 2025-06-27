"use client"

import { useState } from "react"
import EnhancedSidebar from "@/components/shared/enhanced-sidebar"
import DynamicLayout from "@/components/shared/dynamic-layout"
import { Target, Grid3X3, Wrench, User, Settings as SettingsIcon, BarChart3 } from "lucide-react"

export default function DashboardPage() {
  const [activeSection] = useState("dashboard")
  const [activeSubsection] = useState("")

  const handleSectionChange = (sectionId: string, subsectionId?: string) => {
    if (sectionId === "dashboard") {
      // Already on dashboard page, no action needed
      return
    } else if (sectionId === "focus") {
      window.location.href = "/focus"
    } else if (sectionId === "agent-builder") {
      window.location.href = "/agent-builder"
    } else if (sectionId === "marketplace") {
      const subsection = subsectionId ? `?subsection=${subsectionId}` : ""
      window.location.href = `/marketplace${subsection}`
    } else if (sectionId === "my-agents") {
      window.location.href = "/my-agents"
    } else if (sectionId === "analytics") {
      window.location.href = "/analytics"
    } else if (sectionId === "settings") {
      window.location.href = "/settings"
    } else if (sectionId === "home") {
      window.location.href = "/"
    }
  }

  const quickActions = [
    {
      id: "focus",
      title: "Focus Page",
      description: "Start your focused work session with AI assistance",
      icon: Target,
      href: "/focus",
      gradient: "from-[#7f5af0] to-[#10b981]"
    },
    {
      id: "agent-builder",
      title: "Agent Builder",
      description: "Create and customize your AI agents",
      icon: Wrench,
      href: "/agent-builder",
      gradient: "from-[#10b981] to-[#059669]"
    },
    {
      id: "marketplace",
      title: "Marketplace",
      description: "Discover and install new AI agents",
      icon: Grid3X3,
      href: "/marketplace",
      gradient: "from-[#7f5af0] to-[#a855f7]"
    },
    {
      id: "my-agents",
      title: "My Agents",
      description: "Manage your installed AI agents",
      icon: User,
      href: "/my-agents",
      gradient: "from-[#06b6d4] to-[#0891b2]"
    },
    {
      id: "analytics",
      title: "Analytics",
      description: "View insights and progress with Toro's AI analysis",
      icon: BarChart3,
      href: "/analytics",
      gradient: "from-[#facc15] to-[#f97316]"
    },
    {
      id: "settings",
      title: "Settings",
      description: "Configure your preferences and account",
      icon: SettingsIcon,
      href: "/settings",
      gradient: "from-[#ef4444] to-[#dc2626]"
    }
  ]

  const renderCenterContent = () => {
    return (
      <div className="h-full bg-[#0d0e11] flex flex-col overflow-auto">
        <div className="flex-1 p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#e6ebf4] mb-2">
              Welcome to Zentoro Dashboard
            </h1>
            <p className="text-[#9ca3af] text-lg">
              Your AI-powered execution engine. Choose a section to get started.
            </p>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
            {quickActions.map((action) => {
              const IconComponent = action.icon
      return (
                <div
                  key={action.id}
                  onClick={() => window.location.href = action.href}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${action.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-[#e6ebf4] group-hover:text-white transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-[#9ca3af] leading-relaxed group-hover:text-[#b8c5d1] transition-colors">
                    {action.description}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Recent Activity Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-[#e6ebf4] mb-6">Recent Activity</h2>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="text-center py-8">
                <div className="text-4xl mb-4">📊</div>
                <p className="text-[#9ca3af]">
                  Your recent activity will appear here once you start using the platform.
                </p>
              </div>
            </div>
          </div>
          </div>
        </div>
      )
  }

  return (
    <DynamicLayout
      leftSidebar={
        <EnhancedSidebar
          activeSection={activeSection}
          activeSubsection={activeSubsection}
          onSectionChange={handleSectionChange}
        />
      }
      centerContent={renderCenterContent()}
      rightSidebar={null}
      showRightSidebar={false}
    />
  )
}
