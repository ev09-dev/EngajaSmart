'use client'

import { useAuth } from '@/contexts/AuthContext'
import { LogOut, User } from 'lucide-react'

export default function Header() {
  const { user, logout } = useAuth()

  if (!user) {
    return (
      <header className="bg-white border-b border-gray-200 p-6">
        <p className="text-gray-600">Carregando...</p>
      </header>
    )
  }

  return (
    <header className="bg-white border-b border-gray-200 p-6 flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <p className="text-sm text-gray-600">Welcome back, {user.email}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
          <User size={20} className="text-gray-700" />
          <span className="text-sm font-medium text-gray-700">{user.email}</span>
        </div>
        <button 
          onClick={logout}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </header>
  )
}