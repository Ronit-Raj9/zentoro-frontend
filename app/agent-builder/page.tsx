"use client"

import { useState } from "react"
import EnhancedSidebar from "@/components/shared/enhanced-sidebar"
import AgentBuilderContent from "@/components/agent-builder/agent-builder-content"
import DynamicLayout from "@/components/shared/dynamic-layout"

export default function AgentBuilderPage() {
  const [activeSection] = useState("agent-builder")
  const [activeSubsection] = useState("")

  const handleSectionChange = (sectionId: string, subsectionId?: string) => {
    if (sectionId === "agent-builder") {
      // Already on agent-builder page, no action needed
      return
    } else if (sectionId === "focus") {
      window.location.href = "/focus"
    } else if (sectionId === "marketplace") {
      const subsection = subsectionId ? `?subsection=${subsectionId}` : ""
      window.location.href = `/marketplace${subsection}`
    } else if (sectionId === "my-agents") {
      window.location.href = "/my-agents"
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
      centerContent={<AgentBuilderContent />}
      rightSidebar={null}
      showRightSidebar={false}
    />
  )
} 