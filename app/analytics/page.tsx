"use client"

import { useState, Suspense } from "react"
import EnhancedSidebar from "@/components/shared/enhanced-sidebar"
import AnalyticsContent from "@/components/analytics/analytics-content"
import DynamicLayout from "@/components/shared/dynamic-layout"

function AnalyticsPageContent() {
  const [activeSection] = useState("analytics")
  const [activeSubsection] = useState("")

  const handleSectionChange = (sectionId: string, subsectionId?: string) => {
    if (sectionId === "analytics") {
      return
    } else if (sectionId === "focus") {
      window.location.href = "/focus"
    } else if (sectionId === "agent-builder") {
      window.location.href = "/agent-builder"
    } else if (sectionId === "marketplace") {
      window.location.href = "/marketplace"
    } else if (sectionId === "my-agents") {
      window.location.href = "/my-agents"
    } else if (sectionId === "settings") {
      window.location.href = "/settings"
    } else if (sectionId === "dashboard") {
      window.location.href = "/dashboard"
    }
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
      centerContent={<AnalyticsContent />}
      showRightSidebar={false}
    />
  )
}

export default function AnalyticsPage() {
  return (
    <Suspense fallback={<div className="h-screen bg-[#0d0e11] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#facc15] mx-auto mb-4"></div>
        <p className="text-[#9ca3af]">Loading analytics...</p>
      </div>
    </div>}>
      <AnalyticsPageContent />
    </Suspense>
  )
} 