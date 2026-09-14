'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      alert('As senhas não correspondem!')
      return
    }

    setLoading(true)
    // TODO: Implementar cadastro com Supabase
    console.log('Cadastro:', email)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-2xl p-10 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Criar Conta</h1>

        <form onSubmit={handleSignUp} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="seu@email.com"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Senha"
            required
          />

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Confirmar Senha"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            {loading ? 'Criando...' : 'Criar Conta'}
          </button>
        </form>

        <p className="mt-6 text-center">
          Já tem conta?{' '}
          <Link href="/auth" className="text-blue-600 font-bold">
            Fazer Login
          </Link>
        </p>
      </div>
    </div>
  )
}