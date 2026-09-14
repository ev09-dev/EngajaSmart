'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function PricingPage() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  const plans = [
    {
      name: 'Starter',
      price: 8.99,
      priceId: 'price_1U9j6wIKGPaG04MI3r2Nxaoo', // Substitua pelo seu
      features: [
        '50 comentários/mês',
        'Acesso básico',
        'Suporte por email',
        '1 conta social',
      ],
    },
    {
      name: 'Pro',
      price: 24.98,
      priceId: 'price_1U9j5nIKGPaG04MIhZdBrv7n', // Substitua pelo seu
      features: [
        '500 comentários/mês',
        'Analytics avançado',
        'Suporte prioritário',
        'Conectar 3 contas',
        'Automação básica',
      ],
      popular: true,
    },
    {
      name: 'Agency',
      price: 56.98,
      priceId: 'price_1U9j4HIKGPaG04MINVDXZSQy', // Substitua pelo seu
      features: [
        'Comentários ilimitados',
        'IA personalizada',
        'Suporte 24/7',
        'Conectar contas ilimitadas',
        'API acesso',
      ],
    },
  ]

  const handleCheckout = async (priceId: string) => {
    if (!user) {
      alert('Faça login primeiro!')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId,
          email: user.email,
        }),
      })

      const data = await response.json()
      
      if (data.error) {
        alert('Erro: ' + data.error)
        return
      }

      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao iniciar checkout')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Planos de Preço</h1>
          <p className="text-xl text-gray-600">Escolha o plano perfeito para sua estratégia de engajamento</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg shadow-lg p-8 transition-transform hover:scale-105 ${
                plan.popular
                  ? 'bg-blue-600 text-white border-2 border-blue-600 transform scale-105'
                  : 'bg-white border border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="mb-4 inline-block bg-yellow-400 text-blue-600 px-3 py-1 rounded-full text-sm font-bold">
                  Mais Popular
                </div>
              )}

              <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                {plan.name}
              </h3>

              <div className="mb-6">
                <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                  ${plan.price}
                </span>
                <span className={plan.popular ? 'text-blue-100' : 'text-gray-600'}>/mês</span>
              </div>

              <button
                onClick={() => handleCheckout(plan.priceId)}
                disabled={loading}
                className={`w-full py-3 rounded-lg font-semibold mb-8 transition-colors ${
                  plan.popular
                    ? 'bg-white text-blue-600 hover:bg-gray-100'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                } disabled:opacity-50`}
              >
                {loading ? 'Processando...' : 'Começar Agora'}
              </button>

              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check size={20} className={plan.popular ? 'text-yellow-400' : 'text-green-500'} />
                    <span className="ml-3">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Não tem certeza? Comece com a versão gratuita!</p>
        </div>
      </div>
    </div>
  )
}