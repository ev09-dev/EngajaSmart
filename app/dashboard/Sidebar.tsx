'use client'

import { useState } from 'react'
import { MessageSquare, BarChart3, User, Settings, Mail, LogOut } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const { logout } = useAuth()

  const handleSignOut = () => {
    logout()
  }

  const menuItems = [
    { id: 'comments', label: 'Comments', icon: MessageSquare },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'accounts', label: 'Social Accounts', icon: User },
    { id: 'tone', label: 'Voice Tone', icon: Settings },
    { id: 'automation', label: 'Automation', icon: Mail },
  ]

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#9FA1FF]">EngajaSmart</h1>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-[#9FA1FF] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  )
}