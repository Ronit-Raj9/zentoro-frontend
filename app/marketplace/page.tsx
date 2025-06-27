"use client"

import { useState, Suspense } from "react"
import EnhancedSidebar from "@/components/shared/enhanced-sidebar"
import MarketplaceContent from "@/components/marketplace/marketplace-content"
import DynamicLayout from "@/components/shared/dynamic-layout"

function MarketplacePageContent() {
  const [activeSection] = useState("marketplace")
  const [activeSubsection, setActiveSubsection] = useState("featured")

  const handleSectionChange = (sectionId: string, subsectionId?: string) => {
    if (sectionId === "marketplace") {
      // Already on marketplace page, handle subsection change
      if (subsectionId && ["featured", "top-rated", "new-agents", "all-agents"].includes(subsectionId)) {
        setActiveSubsection(subsectionId)
      }
      return
    } else if (sectionId === "focus") {
      window.location.href = "/focus"
    } else if (sectionId === "agent-builder") {
      window.location.href = "/agent-builder"
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
      centerContent={
        <MarketplaceContent 
          activeSubsection={activeSubsection} 
          onSubsectionChange={setActiveSubsection}
        />
      }
      showRightSidebar={false}
    />
  )
}

export default function MarketplacePage() {
  return (
    <Suspense fallback={<div className="h-screen bg-[#0d0e11] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7f5af0] mx-auto mb-4"></div>
        <p className="text-[#9ca3af]">Loading marketplace...</p>
      </div>
    </div>}>
      <MarketplacePageContent />
    </Suspense>
  )
}
