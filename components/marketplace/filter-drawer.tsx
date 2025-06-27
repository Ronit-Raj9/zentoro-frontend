"use client"

import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import FilterSidebar from "./filter-sidebar"
import type { AgentFilters } from "@/lib/marketplace-data"

interface FilterDrawerProps {
  isOpen: boolean
  onClose: () => void
  filters: AgentFilters
  onFiltersChange: (filters: Partial<AgentFilters>) => void
  onClearFilters: () => void
}

export default function FilterDrawer({ isOpen, onClose, filters, onFiltersChange, onClearFilters }: FilterDrawerProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-[80vw] max-w-sm bg-[#0d0e11] shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-l border-white/10">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h3 className="text-lg font-semibold text-[#e6ebf4]">Filters</h3>
          <Button variant="ghost" size="sm" onClick={onClose} className="p-2 text-[#9ca3af] hover:text-[#e6ebf4]">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <FilterSidebar filters={filters} onFiltersChange={onFiltersChange} onClearFilters={onClearFilters} />
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <Button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-[#7f5af0] to-[#10b981] hover:from-[#7f5af0]/80 hover:to-[#10b981]/80 text-white"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </>
  )
}
