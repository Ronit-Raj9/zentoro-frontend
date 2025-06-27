"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Wrench, Sparkles, Database, Workflow, Settings, TestTube } from "lucide-react"

export default function AgentBuilderContent() {
  const [activeTab, setActiveTab] = useState("details")
  const [agentName, setAgentName] = useState("")
  const [agentDescription, setAgentDescription] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [monetizationModel, setMonetizationModel] = useState("free")

  const tabs = [
    { id: "details", label: "Agent Details", icon: Wrench },
    { id: "knowledge", label: "Knowledge Base", icon: Database },
    { id: "workflow", label: "Workflow", icon: Workflow },
    { id: "config", label: "Model Config", icon: Settings },
    { id: "test", label: "Test & Publish", icon: TestTube },
  ]

  const categories = ["Productivity", "Content Generation", "Customer Support", "Finance", "Analytics", "IoT"]

  return (
    <div className="h-full flex flex-col bg-[#0d0e11]">
      {/* Header */}
      <div className="p-6 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-[#7f5af0] to-[#10b981] rounded-lg flex items-center justify-center">
            <Wrench className="h-4 w-4 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#e6ebf4]">Agent Builder</h1>
            <p className="text-[#9ca3af]">Create and configure your AI agent</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-[#2c2f36] rounded-lg p-1">
          {tabs.map((tab) => {
            const TabIcon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-[#7f5af0] text-white shadow-lg"
                    : "text-[#9ca3af] hover:text-[#e6ebf4] hover:bg-white/5"
                }`}
              >
                <TabIcon className="h-4 w-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === "details" && (
          <Card className="bg-white/5 border-white/10 max-w-4xl">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#e6ebf4] mb-4">Agent Details</h3>
                  <p className="text-[#9ca3af] mb-6">Configure your agent's basic information</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#e6ebf4] mb-2">Agent Name *</label>
                    <Input
                      value={agentName}
                      onChange={(e) => setAgentName(e.target.value)}
                      placeholder="Enter agent name"
                      className="bg-[#2c2f36] border-[#3f4147] text-[#e6ebf4] placeholder:text-[#9ca3af]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#e6ebf4] mb-2">Category *</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-[#2c2f36] border border-[#3f4147] rounded-md text-[#e6ebf4] focus:border-[#7f5af0] focus:ring-1 focus:ring-[#7f5af0]"
                    >
                      <option value="">Select category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#e6ebf4] mb-2">Description *</label>
                  <textarea
                    value={agentDescription}
                    onChange={(e) => setAgentDescription(e.target.value)}
                    placeholder="Describe what your agent does"
                    rows={4}
                    className="w-full px-3 py-2 bg-[#2c2f36] border border-[#3f4147] rounded-md text-[#e6ebf4] placeholder:text-[#9ca3af] focus:border-[#7f5af0] focus:ring-1 focus:ring-[#7f5af0] resize-none"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="public-visibility"
                    className="w-4 h-4 rounded border-[#3f4147] bg-[#2c2f36] text-[#7f5af0] focus:ring-[#7f5af0] focus:ring-offset-0"
                  />
                  <label htmlFor="public-visibility" className="text-sm text-[#e6ebf4]">
                    Public Visibility
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#e6ebf4] mb-4">Monetization Model</label>
                  <div className="flex space-x-4">
                    {[
                      { id: "free", label: "Free" },
                      { id: "subscription", label: "Subscription" },
                      { id: "pay-per-use", label: "Pay Per Use" },
                    ].map((option) => (
                      <label key={option.id} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="monetization"
                          value={option.id}
                          checked={monetizationModel === option.id}
                          onChange={(e) => setMonetizationModel(e.target.value)}
                          className="w-4 h-4 text-[#7f5af0] bg-[#2c2f36] border-[#3f4147] focus:ring-[#7f5af0] focus:ring-offset-0"
                        />
                        <span className="text-sm text-[#e6ebf4]">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab !== "details" && (
          <div className="text-center py-12">
            <Sparkles className="h-16 w-16 text-[#9ca3af] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#e6ebf4] mb-2">Coming Soon</h3>
            <p className="text-[#9ca3af]">This section is under development</p>
          </div>
        )}
      </div>
    </div>
  )
}
