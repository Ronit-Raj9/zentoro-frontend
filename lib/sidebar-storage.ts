const SIDEBAR_WIDTH_KEY = "zentoro-sidebar-width"
const SIDEBAR_STATE_KEY = "zentoro-sidebar-state"

export const sidebarStorage = {
  // Save sidebar width to localStorage
  saveWidth: (width: number) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(SIDEBAR_WIDTH_KEY, width.toString())
    }
  },

  // Get saved sidebar width with improved defaults and constraints
  getWidth: (): number => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(SIDEBAR_WIDTH_KEY)
      if (saved) {
        const savedWidth = Number.parseInt(saved, 10)
        // Ensure saved width still meets current constraints
        const minWidth = Math.max(320, window.innerWidth * 0.25) // 25% min
        const maxWidth = Math.min(800, window.innerWidth * 0.65) // 65% max
        return Math.min(Math.max(savedWidth, minWidth), maxWidth)
      }
    }
    
    // Default to a responsive width based on screen size
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1600) {
        return 500 // Larger screens can accommodate larger sidebar
      } else if (window.innerWidth >= 1200) {
        return 450 // Standard desktop
      } else if (window.innerWidth >= 900) {
        return 400 // Smaller desktop/tablet
      } else {
        return 350 // Mobile landscape
      }
    }
    
    return 450 // Fallback default
  },

  // Save sidebar open/closed state
  saveState: (isOpen: boolean) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(SIDEBAR_STATE_KEY, isOpen.toString())
    }
  },

  // Get saved sidebar state (default to closed for better UX)
  getState: (): boolean => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(SIDEBAR_STATE_KEY)
      if (saved !== null) {
        return saved === "true"
      }
    }
    return true // Default to open for productivity panel
  },
}
