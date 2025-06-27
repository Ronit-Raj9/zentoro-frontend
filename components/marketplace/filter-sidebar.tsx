"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Star, Bot, Sparkles, Users, TrendingUp, Zap, Award, Filter, X, DollarSign, CreditCard, Banknote } from "lucide-react"
import type { AgentFilters } from "@/lib/marketplace-data"

interface FilterSidebarProps {
  filters: AgentFilters
  onFiltersChange: (filters: Partial<AgentFilters>) => void
  onClearFilters: () => void
}

const categories = [
  { name: "Productivity", icon: Bot, color: "text-blue-400" },
  { name: "Content Generation", icon: Sparkles, color: "text-purple-400" },
  { name: "Customer Support", icon: Users, color: "text-green-400" },
  { name: "Finance", icon: TrendingUp, color: "text-yellow-400" },
  { name: "IoT", icon: Zap, color: "text-red-400" },
  { name: "Analytics", icon: Award, color: "text-indigo-400" },
]

const monetizationModels = [
  { id: "subscription", label: "Subscription", icon: CreditCard, description: "Monthly/yearly plans" },
  { id: "pay-per-use", label: "Pay Per Use", icon: Banknote, description: "Pay as you go" },
  { id: "perpetual", label: "One-time Purchase", icon: DollarSign, description: "Buy once, use forever" },
]

const priceRanges = [
  { id: "free", label: "Free", color: "text-green-400" },
  { id: "paid", label: "Paid", color: "text-yellow-400" },
]

export default function FilterSidebar({ filters, onFiltersChange, onClearFilters }: FilterSidebarProps) {
  const handleCategoryChange = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category]
    onFiltersChange({ categories: newCategories })
  }

  const handlePriceChange = (price: string) => {
    const newPrice = filters.price.includes(price)
      ? filters.price.filter((p) => p !== price)
      : [...filters.price, price]
    onFiltersChange({ price: newPrice })
  }

  const handleMonetizationChange = (model: string) => {
    const newModels = filters.monetization.includes(model)
      ? filters.monetization.filter((m) => m !== model)
      : [...filters.monetization, model]
    onFiltersChange({ monetization: newModels })
  }

  const handleRatingChange = (rating: number) => {
    onFiltersChange({ rating: filters.rating === rating ? 0 : rating })
  }

  const activeFilterCount = Object.values(filters).flat().filter(Boolean).length

  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-[#0d0e11]/90 backdrop-blur-sm border-b border-white/10 p-6 z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#7f5af0] to-[#10b981] rounded-xl flex items-center justify-center">
              <Filter className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#e6ebf4]">Filters</h3>
              <p className="text-xs text-[#9ca3af]">Refine your search</p>
            </div>
          </div>
        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
              className="text-[#9ca3af] hover:text-[#e6ebf4] text-xs px-3 py-2 h-8 rounded-lg"
          >
              <X className="h-3 w-3 mr-1" />
              Clear ({activeFilterCount})
          </Button>
        )}
        </div>
      </div>

      <div className="p-6 space-y-8">
      {/* Categories */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-[#e6ebf4] uppercase tracking-wider flex items-center">
            <Bot className="h-4 w-4 mr-2 text-[#7f5af0]" />
            Categories
          </h4>
      <div className="space-y-3">
            {categories.map((category) => {
              const isSelected = filters.categories.includes(category.name)
              const IconComponent = category.icon
              return (
                <label key={category.name} className="flex items-center space-x-3 cursor-pointer group">
                  <div className="relative">
              <input
                type="checkbox"
                      checked={isSelected}
                      onChange={() => handleCategoryChange(category.name)}
                      className="w-4 h-4 rounded border-[#3f4147] bg-[#1a1d23] text-[#7f5af0] focus:ring-[#7f5af0] focus:ring-offset-0 focus:ring-2"
              />
                    {isSelected && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-2 h-2 bg-[#7f5af0] rounded-sm"></div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 flex-1">
                    <IconComponent className={`h-4 w-4 ${category.color} group-hover:scale-110 transition-transform`} />
                    <span className={`text-sm transition-colors ${
                      isSelected ? 'text-[#e6ebf4] font-medium' : 'text-[#9ca3af] group-hover:text-[#e6ebf4]'
                    }`}>
                      {category.name}
                    </span>
                  </div>
                  {isSelected && (
                    <div className="w-2 h-2 bg-gradient-to-r from-[#7f5af0] to-[#10b981] rounded-full animate-pulse"></div>
                  )}
            </label>
              )
            })}
        </div>
      </div>

        <Separator className="bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Price */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-[#e6ebf4] uppercase tracking-wider flex items-center">
            <DollarSign className="h-4 w-4 mr-2 text-[#10b981]" />
            Pricing
          </h4>
      <div className="space-y-3">
            {priceRanges.map((price) => {
              const isSelected = filters.price.includes(price.id)
              return (
                <label key={price.id} className="flex items-center space-x-3 cursor-pointer group">
                  <div className="relative">
              <input
                type="checkbox"
                      checked={isSelected}
                      onChange={() => handlePriceChange(price.id)}
                      className="w-4 h-4 rounded border-[#3f4147] bg-[#1a1d23] text-[#10b981] focus:ring-[#10b981] focus:ring-offset-0 focus:ring-2"
              />
                    {isSelected && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-2 h-2 bg-[#10b981] rounded-sm"></div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 flex-1">
                    <span className={`w-3 h-3 rounded-full ${price.id === 'free' ? 'bg-green-400' : 'bg-yellow-400'}`}></span>
                    <span className={`text-sm transition-colors capitalize ${
                      isSelected ? 'text-[#e6ebf4] font-medium' : 'text-[#9ca3af] group-hover:text-[#e6ebf4]'
                    }`}>
                      {price.label}
              </span>
                  </div>
                  {isSelected && (
                    <div className="w-2 h-2 bg-gradient-to-r from-[#10b981] to-[#7f5af0] rounded-full animate-pulse"></div>
                  )}
            </label>
              )
            })}
        </div>
      </div>

        <Separator className="bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Monetization Model */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-[#e6ebf4] uppercase tracking-wider flex items-center">
            <CreditCard className="h-4 w-4 mr-2 text-[#facc15]" />
            Payment Model
          </h4>
      <div className="space-y-3">
            {monetizationModels.map((model) => {
              const isSelected = filters.monetization.includes(model.id)
              const IconComponent = model.icon
              return (
                <label key={model.id} className="flex items-start space-x-3 cursor-pointer group p-3 rounded-xl hover:bg-white/5 transition-colors">
                  <div className="relative mt-0.5">
              <input
                type="checkbox"
                      checked={isSelected}
                      onChange={() => handleMonetizationChange(model.id)}
                      className="w-4 h-4 rounded border-[#3f4147] bg-[#1a1d23] text-[#facc15] focus:ring-[#facc15] focus:ring-offset-0 focus:ring-2"
              />
                    {isSelected && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-2 h-2 bg-[#facc15] rounded-sm"></div>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <IconComponent className="h-4 w-4 text-[#facc15] group-hover:scale-110 transition-transform" />
                      <span className={`text-sm transition-colors ${
                        isSelected ? 'text-[#e6ebf4] font-medium' : 'text-[#9ca3af] group-hover:text-[#e6ebf4]'
                      }`}>
                        {model.label}
              </span>
                    </div>
                    <p className="text-xs text-[#9ca3af] leading-relaxed">{model.description}</p>
                  </div>
                  {isSelected && (
                    <div className="w-2 h-2 bg-gradient-to-r from-[#facc15] to-[#f59e0b] rounded-full animate-pulse mt-1"></div>
                  )}
            </label>
              )
            })}
        </div>
      </div>

        <Separator className="bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Rating */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-[#e6ebf4] uppercase tracking-wider flex items-center">
            <Star className="h-4 w-4 mr-2 text-yellow-400 fill-current" />
            Minimum Rating
          </h4>
      <div className="space-y-3">
            {[4, 3, 2, 1].map((rating) => {
              const isSelected = filters.rating === rating
              return (
            <button
              key={rating}
              onClick={() => handleRatingChange(rating)}
                  className={`flex items-center space-x-3 w-full text-left p-3 rounded-xl transition-all duration-200 ${
                    isSelected
                      ? "bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-400/30 text-yellow-300"
                      : "text-[#9ca3af] hover:text-[#e6ebf4] hover:bg-white/5 border border-transparent"
              }`}
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-600"}`}
                  />
                ))}
              </div>
                  <span className="text-sm font-medium">& above</span>
                  {isSelected && (
                    <div className="ml-auto w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  )}
            </button>
              )
            })}
          </div>
        </div>

        <Separator className="bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Clear All Button */}
        {activeFilterCount > 0 && (
          <div className="pt-4">
            <Button
              onClick={onClearFilters}
              variant="outline"
              className="w-full border-white/20 text-[#e6ebf4] hover:bg-white/10 hover:border-[#7f5af0]/50 hover:text-[#7f5af0] transition-all"
            >
              <X className="h-4 w-4 mr-2" />
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
