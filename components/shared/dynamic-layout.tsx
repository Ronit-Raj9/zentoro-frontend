"use client"

import type React from "react"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { X, Menu, GripVertical } from "lucide-react"
import { sidebarStorage } from "@/lib/sidebar-storage"

interface DynamicLayoutProps {
  leftSidebar: React.ReactNode
  centerContent: React.ReactNode
  rightSidebar?: React.ReactNode
  showRightSidebar?: boolean
}

export default function DynamicLayout({
  leftSidebar,
  centerContent,
  rightSidebar,
  showRightSidebar = true,
}: DynamicLayoutProps) {
  // Simple two states: closed (false) and open (true)
  const [isOpen, setIsOpen] = useState(false)
  const [sidebarWidth, setSidebarWidth] = useState(450) // Default to 450px
  const [isResizing, setIsResizing] = useState(false)
  const [centerWidth, setCenterWidth] = useState(0)
  const [showResizeGuide, setShowResizeGuide] = useState(false)

  const layoutRef = useRef<HTMLDivElement>(null)
  const startXRef = useRef(0)
  const startWidthRef = useRef(0)

  // Constants for layout calculations
  const LEFT_SIDEBAR_WIDTH = 72 // Fixed sidebar width
  const MIN_CENTER_WIDTH = 400 // Minimum usable width for center content
  const MIN_SIDEBAR_WIDTH = 320 // Minimum sidebar width
  const MAX_SIDEBAR_WIDTH = 800 // Maximum sidebar width
  const MIN_SIDEBAR_WIDTH_RATIO = 0.25 // Min 25% of screen
  const MAX_SIDEBAR_WIDTH_RATIO = 0.65 // Max 65% of screen

  // Calculate available width and constraints
  const calculateLayout = useCallback(() => {
    if (typeof window === "undefined") return

    const viewportWidth = window.innerWidth
    const availableWidth = viewportWidth - LEFT_SIDEBAR_WIDTH

    if (isOpen && showRightSidebar) {
      // Calculate dynamic width constraints based on viewport
      const minSidebarWidth = Math.max(MIN_SIDEBAR_WIDTH, viewportWidth * MIN_SIDEBAR_WIDTH_RATIO)
      const maxSidebarWidth = Math.min(
        Math.min(MAX_SIDEBAR_WIDTH, viewportWidth * MAX_SIDEBAR_WIDTH_RATIO),
        availableWidth - MIN_CENTER_WIDTH // Ensure center pane gets minimum width
      )

      // Constrain current sidebar width within bounds
      const constrainedWidth = Math.min(Math.max(sidebarWidth, minSidebarWidth), maxSidebarWidth)
      
      // Update sidebar width if it was constrained
      if (constrainedWidth !== sidebarWidth) {
        setSidebarWidth(constrainedWidth)
      }
      
      const newCenterWidth = availableWidth - constrainedWidth
      setCenterWidth(newCenterWidth)
    } else {
      // Sidebar closed - center takes full available space
      setCenterWidth(availableWidth)
    }
  }, [isOpen, sidebarWidth, showRightSidebar])

  // Load saved state and calculate initial layout
  useEffect(() => {
    if (showRightSidebar) {
      const savedWidth = sidebarStorage.getWidth()
      const savedOpen = sidebarStorage.getState()
      
      setSidebarWidth(savedWidth)
      setIsOpen(savedOpen)
    } else {
      setIsOpen(false)
    }
  }, [showRightSidebar])

  // Recalculate layout when dependencies change
  useEffect(() => {
    calculateLayout()
  }, [calculateLayout])

  // Recalculate on window resize
  useEffect(() => {
    const handleResize = () => calculateLayout()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [calculateLayout])

  // Handle sidebar open - expands to last saved width
  const handleSidebarOpen = () => {
    if (!showRightSidebar) return
    setIsOpen(true)
    sidebarStorage.saveState(true)
  }

  // Handle sidebar close - completely hides the sidebar
  const handleSidebarClose = () => {
    setIsOpen(false)
    sidebarStorage.saveState(false)
  }

  // Handle resize start
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      setIsResizing(true)
      setShowResizeGuide(true)
      startXRef.current = e.clientX
      startWidthRef.current = sidebarWidth
      document.body.style.cursor = "col-resize"
      document.body.style.userSelect = "none"
    },
    [sidebarWidth],
  )

  // Handle resize move with real-time feedback
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing) return

      const deltaX = startXRef.current - e.clientX
      const newWidth = startWidthRef.current + deltaX

      const viewportWidth = window.innerWidth
      const availableWidth = viewportWidth - LEFT_SIDEBAR_WIDTH
      
      // Calculate dynamic bounds
      const minWidth = Math.max(MIN_SIDEBAR_WIDTH, viewportWidth * MIN_SIDEBAR_WIDTH_RATIO)
      const maxWidth = Math.min(
        Math.min(MAX_SIDEBAR_WIDTH, viewportWidth * MAX_SIDEBAR_WIDTH_RATIO),
        availableWidth - MIN_CENTER_WIDTH
      )

      const constrainedWidth = Math.min(Math.max(newWidth, minWidth), maxWidth)

      setSidebarWidth(constrainedWidth)
      setCenterWidth(availableWidth - constrainedWidth)
    },
    [isResizing],
  )

  // Handle resize end and save width
  const handleMouseUp = useCallback(() => {
    if (isResizing) {
      setIsResizing(false)
      setShowResizeGuide(false)
      document.body.style.cursor = ""
      document.body.style.userSelect = ""
      sidebarStorage.saveWidth(sidebarWidth) // Save the final width
    }
  }, [isResizing, sidebarWidth])

  // Add/remove resize event listeners
  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isResizing, handleMouseMove, handleMouseUp])

  // Keyboard shortcut support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle sidebar with Cmd/Ctrl + \
      if ((e.metaKey || e.ctrlKey) && e.key === '\\') {
        e.preventDefault()
        if (isOpen) {
          handleSidebarClose()
        } else {
          handleSidebarOpen()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  return (
    <div ref={layoutRef} className="h-screen bg-[#0d0e11] flex overflow-hidden relative">
      {/* Left Sidebar - Fixed Position */}
      <div className="flex-shrink-0 relative z-40">
        {leftSidebar}
      </div>

      {/* Center Content - Dynamic Width with Smooth Transitions */}
      <div
        className="flex-1 flex flex-col min-w-0 transition-all duration-200 ease-out relative"
        style={{
          width: `${centerWidth}px`,
          maxWidth: `${centerWidth}px`,
        }}
      >
        {centerContent}
      </div>

      {/* Right Sidebar - Two States: Completely Closed or Completely Open */}
      {showRightSidebar && isOpen && rightSidebar && (
        <div
          className="flex-shrink-0 bg-[#0d0e11] border-l border-white/10 shadow-2xl transition-all duration-200 ease-out flex relative z-30"
          style={{ width: `${sidebarWidth}px` }}
        >
          {/* Enhanced Resize Handle */}
          <div
            className="w-4 h-full bg-transparent hover:bg-[#7f5af0]/20 cursor-col-resize flex-shrink-0 group relative transition-all duration-200 flex items-center justify-center"
            onMouseDown={handleMouseDown}
            onMouseEnter={() => setShowResizeGuide(true)}
            onMouseLeave={() => !isResizing && setShowResizeGuide(false)}
          >
            {/* Enhanced visual resize indicator */}
            <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-transparent via-[#7f5af0]/10 to-[#7f5af0]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            
            {/* Better resize grip */}
            <div className="absolute inset-0 flex items-center justify-center">
              <GripVertical className="w-4 h-4 text-[#7f5af0]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>

            {/* Active resize indicator */}
            {isResizing && (
              <div className="absolute inset-y-0 left-0 w-4 bg-[#7f5af0]/40 border-l-2 border-[#7f5af0]" />
            )}

            {/* Resize guide tooltip */}
            {showResizeGuide && (
              <div className="absolute top-4 left-6 opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                <div className="bg-[#2c2f36] text-[#e6ebf4] px-3 py-2 rounded-lg text-xs border border-[#7f5af0]/30 shadow-lg backdrop-blur-sm whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <GripVertical className="w-3 h-3 text-[#7f5af0]" />
                    <span>Drag to resize</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Main Content with Close Button */}
          <div className="flex-1 flex flex-col min-w-0 relative">
            {/* Close Button - Top Right */}
            <Button
              onClick={handleSidebarClose}
              size="sm"
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-red-500/20 hover:bg-red-500 hover:scale-105 text-red-400 hover:text-white border border-red-500/30 hover:border-red-500 rounded-lg transition-all duration-200 shadow-lg"
              title="Close Productivity Panel (Ctrl+\)"
            >
              <X className="h-3 w-3" />
            </Button>
            
            {/* Main Content */}
            <div className="flex-1 pt-2 overflow-hidden">{rightSidebar}</div>
          </div>

          {/* Enhanced Real-time Resize Indicator */}
          {isResizing && (
            <div className="absolute bottom-6 left-6 bg-[#1a1b23]/95 text-[#e6ebf4] px-4 py-3 rounded-2xl text-sm border border-[#7f5af0]/40 shadow-2xl backdrop-blur-lg z-50">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between space-x-6">
                  <span className="text-[#9ca3af] font-medium">Sidebar Width:</span>
                  <span className="font-mono text-[#7f5af0] font-bold">{Math.round(sidebarWidth)}px</span>
                </div>
                <div className="flex items-center justify-between space-x-6">
                  <span className="text-[#9ca3af] font-medium">Percentage:</span>
                  <span className="font-mono text-[#7f5af0] font-bold">{Math.round((sidebarWidth / window.innerWidth) * 100)}%</span>
                </div>
                <div className="border-t border-white/10 pt-2">
                  <div className="flex items-center justify-between space-x-6">
                    <span className="text-[#9ca3af] font-medium">Center Width:</span>
                    <span className="font-mono text-[#10b981] font-bold">{Math.round(centerWidth)}px</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Enhanced Floating Open Button */}
      {showRightSidebar && !isOpen && (
        <div className="fixed top-4 right-4 z-50">
          <Button
            onClick={handleSidebarOpen}
            size="sm"
            className="w-12 h-12 bg-gradient-to-r from-[#7f5af0] to-[#6d28d9] hover:from-[#6d28d9] hover:to-[#5b21b6] hover:scale-110 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-[#7f5af0]/30"
            title="Open Productivity Panel (Ctrl+\)"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      )}

      {/* Resize Guide Overlay */}
      {isResizing && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-[1px] pointer-events-none z-20" />
      )}
    </div>
  )
}
