'use client'

import { useState, useEffect } from 'react'
import { Heart, Plus, Trash2, Link as LinkIcon } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'

interface SocialAccount {
  id: string
  platform: 'instagram' | 'tiktok'
  username: string
  created_at: string
}

export default function AccountsTab() {
  const { user } = useAuth()
  const [accounts, setAccounts] = useState<SocialAccount[]>([])
  const [loading, setLoading] = useState(true)
  const [connecting, setConnecting] = useState(false)

  useEffect(() => {
    if (user) {
      fetchAccounts()
    }
  }, [user])

  const fetchAccounts = async () => {
  try {
    setLoading(true)
    const { data, error } = await supabase
      .from('social_accounts')
      .select('*')
      .eq('user_id', user?.id)

    if (error) throw error
    setAccounts(data || [])
  } catch (err: any) {
    console.error('Erro ao buscar contas:', err.message)
  } finally {
    setLoading(false)
  }
}

  const connectInstagram = () => {
    setConnecting(true)
    window.location.href = '/api/auth/instagram'
  }

  const connectTikTok = () => {
    setConnecting(true)
    window.location.href = '/api/auth/tiktok'
  }

  const deleteAccount = async (id: string) => {
    if (!confirm('Tem certeza que deseja desconectar?')) return

    try {
      const { error } = await supabase
        .from('social_accounts')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchAccounts()
    } catch (error) {
      console.error('Erro ao deletar:', error)
      alert('Erro ao desconectar')
    }
  }

  return (
    <div className="space-y-8">
      {/* Conectar Contas */}
      <div>
        <h3 className="text-2xl font-bold mb-6">Conectar Contas Sociais</h3>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Instagram */}
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg p-8 text-white">
            <div className="flex items-center gap-4 mb-6">
              <Heart size={40} />
              <div>
                <h4 className="text-2xl font-bold">Instagram</h4>
                <p className="text-pink-100">Conecte sua conta de negócios</p>
              </div>
            </div>

            <button
              onClick={connectInstagram}
              disabled={connecting}
              className="w-full bg-white text-pink-600 py-3 rounded-lg font-bold hover:bg-pink-50 transition disabled:opacity-50"
            >
              {connecting ? 'Conectando...' : 'Conectar Instagram'}
            </button>
          </div>

          {/* TikTok */}
          <div className="bg-gradient-to-br from-black to-gray-800 rounded-lg p-8 text-white">
            <div className="flex items-center gap-4 mb-6">
              <svg
                className="w-10 h-10"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.68v13.7a2.4 2.4 0 0 1-2.54 2.4A2.4 2.4 0 0 1 7.1 13.46c0-1.34 1.07-2.46 2.41-2.46.37 0 .74.08 1.08.24V9.5a5.32 5.32 0 0 0-1.08-.11C9.41 9.38 7.6 11.06 7.6 13.46c0 2.41 1.67 4.37 3.91 4.37 2.5 0 4.56-2.27 4.56-5.07V8.5a5.8 5.8 0 0 0 3.74 1.42v-3.7a4.5 4.5 0 0 1-.61-.05z" />
              </svg>
              <div>
                <h4 className="text-2xl font-bold">TikTok</h4>
                <p className="text-gray-300">Conecte sua conta</p>
              </div>
            </div>

            <button
              onClick={connectTikTok}
              disabled={connecting}
              className="w-full bg-white text-black py-3 rounded-lg font-bold hover:bg-gray-100 transition disabled:opacity-50"
            >
              {connecting ? 'Conectando...' : 'Conectar TikTok'}
            </button>
          </div>
        </div>
      </div>

      {/* Contas Conectadas */}
      <div>
        <h3 className="text-2xl font-bold mb-6">Contas Conectadas</h3>

        {loading ? (
          <p className="text-gray-600">Carregando...</p>
        ) : accounts.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <LinkIcon size={48} className="text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">
              Nenhuma conta conectada ainda
            </p>
            <p className="text-gray-500">
              Conecte sua primeira conta acima para começar
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {accounts.map((account) => (
              <div
                key={account.id}
                className="bg-white rounded-lg shadow-md p-6 border border-gray-200 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  {account.platform === 'instagram' ? (
                    <Heart size={32} className="text-pink-500" />
                  ) : (
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.68v13.7a2.4 2.4 0 0 1-2.54 2.4A2.4 2.4 0 0 1 7.1 13.46c0-1.34 1.07-2.46 2.41-2.46.37 0 .74.08 1.08.24V9.5a5.32 5.32 0 0 0-1.08-.11C9.41 9.38 7.6 11.06 7.6 13.46c0 2.41 1.67 4.37 3.91 4.37 2.5 0 4.56-2.27 4.56-5.07V8.5a5.8 5.8 0 0 0 3.74 1.42v-3.7a4.5 4.5 0 0 1-.61-.05z" />
                    </svg>
                  )}
                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      @{account.username}
                    </p>
                    <p className="text-sm text-gray-600">
                      {account.platform === 'instagram'
                        ? 'Instagram'
                        : 'TikTok'}{' '}
                      • Conectado em{' '}
                      {new Date(account.created_at).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => deleteAccount(account.id)}
                  className="bg-red-50 hover:bg-red-100 text-red-600 p-3 rounded-lg transition"
                  title="Desconectar"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}