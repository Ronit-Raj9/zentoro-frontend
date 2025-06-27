"use client"

import { useState } from "react"
import EnhancedSidebar from "@/components/shared/enhanced-sidebar"
import DynamicLayout from "@/components/shared/dynamic-layout"
import ChatTerminal from "@/components/focus/chat-terminal"
import ProductivityPanelContent from "@/components/focus/productivity-panel-content"

export default function FocusPage() {
  const [activeSection, setActiveSection] = useState("focus")
  const [activeSubsection, setActiveSubsection] = useState("")

  const handleSectionChange = (sectionId: string, subsectionId?: string) => {
    setActiveSection(sectionId)
    if (subsectionId) {
      setActiveSubsection(subsectionId)
    }
  }

  const renderMainContent = () => {
    return (
      <div className="flex-1">
        <ChatTerminal />
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
      centerContent={renderMainContent()}
      rightSidebar={<ProductivityPanelContent />}
      showRightSidebar={true}
    />
  )
}
