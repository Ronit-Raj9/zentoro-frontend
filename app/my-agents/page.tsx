"use client"

import { useState } from "react"
import EnhancedSidebar from "@/components/shared/enhanced-sidebar"
import MyAgentsContent from "@/components/my-agents/my-agents-content"
import DynamicLayout from "@/components/shared/dynamic-layout"

export default function MyAgentsPage() {
  const [activeSection] = useState("my-agents")
  const [activeSubsection] = useState("")

  const handleSectionChange = (sectionId: string, subsectionId?: string) => {
    if (sectionId === "my-agents") {
      // Already on my-agents page, no action needed
      return
    } else if (sectionId === "focus") {
      window.location.href = "/focus"
    } else if (sectionId === "agent-builder") {
      window.location.href = "/agent-builder"
    } else if (sectionId === "marketplace") {
      const subsection = subsectionId ? `?subsection=${subsectionId}` : ""
      window.location.href = `/marketplace${subsection}`
    } else if (sectionId === "settings") {
      window.location.href = "/settings"
    } else if (sectionId === "home") {
      window.location.href = "/"
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
      centerContent={<MyAgentsContent />}
      rightSidebar={null}
      showRightSidebar={false}
    />
  )
} 