"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Settings, User, Key, CreditCard, DollarSign } from "lucide-react"

export default function SettingsContent() {
  const [activeTab, setActiveTab] = useState("profile")

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "api-keys", label: "API Keys", icon: Key },
    { id: "payment", label: "Payment", icon: CreditCard },
    { id: "payout", label: "Payout", icon: DollarSign },
  ]

  return (
    <div className="h-full flex flex-col bg-[#0d0e11]">
      {/* Header */}
      <div className="p-6 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-[#ef4444] to-[#dc2626] rounded-lg flex items-center justify-center">
            <Settings className="h-4 w-4 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#e6ebf4]">Settings</h1>
            <p className="text-[#9ca3af]">Manage your account settings and preferences</p>
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
        {activeTab === "profile" && (
          <div className="space-y-6 max-w-2xl">
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-[#e6ebf4] mb-4">Profile Settings</h3>
                <p className="text-[#9ca3af] mb-6">Update your personal information</p>

                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#e6ebf4] mb-2">First Name</label>
                      <Input defaultValue="John" className="bg-[#2c2f36] border-[#3f4147] text-[#e6ebf4]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#e6ebf4] mb-2">Last Name</label>
                      <Input defaultValue="Doe" className="bg-[#2c2f36] border-[#3f4147] text-[#e6ebf4]" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#e6ebf4] mb-2">Email</label>
                    <Input
                      defaultValue="john.doe@example.com"
                      className="bg-[#2c2f36] border-[#3f4147] text-[#e6ebf4]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#e6ebf4] mb-2">Bio</label>
                    <textarea
                      defaultValue="Tell us about yourself"
                      rows={3}
                      className="w-full px-3 py-2 bg-[#2c2f36] border border-[#3f4147] rounded-md text-[#e6ebf4] placeholder:text-[#9ca3af] focus:border-[#7f5af0] focus:ring-1 focus:ring-[#7f5af0] resize-none"
                    />
                  </div>

                  <Button className="bg-[#10b981] hover:bg-[#10b981]/80 text-white">Update Profile</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-[#e6ebf4] mb-4">Account Security</h3>
                <p className="text-[#9ca3af] mb-6">Manage your password and security settings</p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#e6ebf4] mb-2">Current Password</label>
                    <Input type="password" className="bg-[#2c2f36] border-[#3f4147] text-[#e6ebf4]" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#e6ebf4] mb-2">New Password</label>
                    <Input type="password" className="bg-[#2c2f36] border-[#3f4147] text-[#e6ebf4]" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#e6ebf4] mb-2">Confirm New Password</label>
                    <Input type="password" className="bg-[#2c2f36] border-[#3f4147] text-[#e6ebf4]" />
                  </div>

                  <Button className="bg-[#7f5af0] hover:bg-[#7f5af0]/80 text-white">Update Password</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab !== "profile" && (
          <div className="text-center py-12">
            <Settings className="h-16 w-16 text-[#9ca3af] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#e6ebf4] mb-2">Coming Soon</h3>
            <p className="text-[#9ca3af]">This section is under development</p>
          </div>
        )}
      </div>
    </div>
  )
}
