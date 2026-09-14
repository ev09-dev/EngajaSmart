'use client'

import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'

export default function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          EngajaSmart
        </Link>

        <nav className="flex gap-6 items-center">
          <Link href="/" className="text-gray-600 hover:text-blue-600">
            Home
          </Link>
          <Link href="/pricing" className="text-gray-600 hover:text-blue-600">
            Planos
          </Link>
          <Link href="/terms" className="text-gray-600 hover:text-blue-600">
            Termos
          </Link>

          {user ? (
            <>
              <Link href="/dashboard" className="text-gray-600 hover:text-blue-600">
                Dashboard
              </Link>
              <button
                onClick={() => logout()}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Sair
              </button>
            </>
          ) : (
            <Link href="/auth" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}