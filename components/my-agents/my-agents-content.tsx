"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { User, Plus, Package } from "lucide-react"

export default function MyAgentsContent() {
  const [activeTab, setActiveTab] = useState("created")

  return (
    <div className="h-full flex flex-col bg-[#0d0e11]">
      {/* Header */}
      <div className="p-6 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-[#10b981] to-[#059669] rounded-lg flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#e6ebf4]">My Agents</h1>
              <p className="text-[#9ca3af]">Manage your created and purchased AI agents</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-[#2c2f36] rounded-lg p-1">
          <button
            onClick={() => setActiveTab("created")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
              activeTab === "created"
                ? "bg-[#7f5af0] text-white shadow-lg"
                : "text-[#9ca3af] hover:text-[#e6ebf4] hover:bg-white/5"
            }`}
          >
            <Plus className="h-4 w-4" />
            <span className="font-medium">My Created Agents (0)</span>
          </button>
          <button
            onClick={() => setActiveTab("purchased")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
              activeTab === "purchased"
                ? "bg-[#7f5af0] text-white shadow-lg"
                : "text-[#9ca3af] hover:text-[#e6ebf4] hover:bg-white/5"
            }`}
          >
            <Package className="h-4 w-4" />
            <span className="font-medium">My Purchased Agents (3)</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === "created" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#e6ebf4]">Created Agents</h2>
              <Button className="bg-[#10b981] hover:bg-[#10b981]/80 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Create New Agent
              </Button>
            </div>

            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="h-8 w-8 text-[#9ca3af]" />
                </div>
                <h3 className="text-lg font-semibold text-[#e6ebf4] mb-2">No agents created yet</h3>
                <p className="text-[#9ca3af] mb-6">Create your first AI agent to get started</p>
                <Button className="bg-[#10b981] hover:bg-[#10b981]/80 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Agent
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "purchased" && (
          <div>
            <h2 className="text-xl font-semibold text-[#e6ebf4] mb-6">Purchased Agents</h2>
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-[#9ca3af] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#e6ebf4] mb-2">Coming Soon</h3>
              <p className="text-[#9ca3af]">Your purchased agents will appear here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
