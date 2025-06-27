"use client"

import { useState } from "react"
import EnhancedSidebar from "@/components/shared/enhanced-sidebar"
import SettingsContent from "@/components/settings/settings-content"
import DynamicLayout from "@/components/shared/dynamic-layout"

export default function SettingsPage() {
  const [activeSection] = useState("settings")
  const [activeSubsection] = useState("")

  const handleSectionChange = (sectionId: string, subsectionId?: string) => {
    if (sectionId === "settings") {
      // Already on settings page, no action needed
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
      centerContent={<SettingsContent />}
      rightSidebar={null}
      showRightSidebar={false}
    />
  )
} 