'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { LogOut, Home } from 'lucide-react'
import Link from 'next/link'
import AccountsTab from './tabs/AccountsTab'

export default function Dashboard() {
  const { user, isLoading, logout } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('accounts')

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth')
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Carregando...</h1>
          <p className="text-gray-600">Aguarde um momento</p>
        </div>
      </div>
    )
  }

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  const tabs = [
    { id: 'accounts', label: 'Contas Sociais', icon: '🔗' },
    { id: 'comments', label: 'Comentários', icon: '💬' },
    { id: 'analytics', label: 'Analytics', icon: '📊' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-2">Bem-vindo, {user.email}!</p>
            </div>
            <div className="flex gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                <Home size={20} />
                Início
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition font-semibold"
              >
                <LogOut size={20} />
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs Navigation */}
        <div className="flex gap-2 mb-8 border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 font-semibold transition-colors border-b-2 ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          {activeTab === 'accounts' && <AccountsTab />}

          {activeTab === 'comments' && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">Comentários</h2>
              <p className="text-gray-600">
                Aqui você verá os comentários que recebeu
              </p>
              <p className="text-gray-400 mt-2">
                Conecte suas contas sociais para começar
              </p>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">Analytics</h2>
              <p className="text-gray-600">
                Dados e estatísticas sobre seu engajamento
              </p>
              <p className="text-gray-400 mt-2">
                Conecte suas contas sociais para ver análises
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}