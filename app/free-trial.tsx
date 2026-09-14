'use client'

import Link from 'next/link'
import { Check, X, ArrowRight } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function FreeTrialPage() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Plano Gratuito</h1>
          <p className="text-xl text-gray-600">
            Teste EngajaSmart por 7 dias completamente grátis!
          </p>
        </div>

        {/* Trial Card */}
        <div className="bg-white rounded-lg shadow-lg p-10 mb-12 border-2 border-green-500">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Teste Gratuito</h2>
              <p className="text-gray-600 mt-2">7 dias de acesso completo</p>
            </div>
            <div className="bg-green-100 px-6 py-3 rounded-lg">
              <p className="text-green-700 font-bold text-xl">Grátis</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-bold mb-4">O que você recebe:</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Check size={24} className="text-green-500" />
                <span className="text-gray-700">
                  <strong>100 comentários/mês</strong> - Teste a plataforma
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Check size={24} className="text-green-500" />
                <span className="text-gray-700">
                  <strong>1 conta social</strong> - Conecte Instagram ou TikTok
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Check size={24} className="text-green-500" />
                <span className="text-gray-700">
                  <strong>IA básica</strong> - Gere respostas automáticas
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Check size={24} className="text-green-500" />
                <span className="text-gray-700">
                  <strong>Suporte por email</strong> - Tire suas dúvidas
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Check size={24} className="text-green-500" />
                <span className="text-gray-700">
                  <strong>7 dias</strong> - Período de avaliação
                </span>
              </li>
            </ul>
          </div>

          {user ? (
            <Link
              href="/dashboard"
              className="w-full bg-green-600 text-white py-4 rounded-lg font-bold hover:bg-green-700 transition text-center flex items-center justify-center gap-2"
            >
              Começar Teste Grátis <ArrowRight size={24} />
            </Link>
          ) : (
            <Link
              href="/auth"
              className="w-full bg-green-600 text-white py-4 rounded-lg font-bold hover:bg-green-700 transition text-center flex items-center justify-center gap-2"
            >
              Criar Conta Gratuita <ArrowRight size={24} />
            </Link>
          )}

          <p className="text-center text-gray-600 mt-4">
            Sem cartão de crédito necessário ✓
          </p>
        </div>

        {/* Comparison */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8">
            Compare com nossos planos pagos
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2">
                  <th className="text-left py-4 px-4">Recurso</th>
                  <th className="text-center py-4 px-4">
                    <div className="text-green-600 font-bold">Gratuito</div>
                  </th>
                  <th className="text-center py-4 px-4">
                    <div className="font-bold">Starter</div>
                  </th>
                  <th className="text-center py-4 px-4">
                    <div className="font-bold">Pro</div>
                  </th>
                  <th className="text-center py-4 px-4">
                    <div className="font-bold">Agency</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-4 px-4">Comentários/mês</td>
                  <td className="text-center py-4 px-4">100</td>
                  <td className="text-center py-4 px-4">50</td>
                  <td className="text-center py-4 px-4">500</td>
                  <td className="text-center py-4 px-4">Ilimitado</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-4">Contas sociais</td>
                  <td className="text-center py-4 px-4">1</td>
                  <td className="text-center py-4 px-4">1</td>
                  <td className="text-center py-4 px-4">3</td>
                  <td className="text-center py-4 px-4">Ilimitadas</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-4">IA Personalizada</td>
                  <td className="text-center py-4 px-4">
                    <X size={20} className="text-red-500 mx-auto" />
                  </td>
                  <td className="text-center py-4 px-4">
                    <X size={20} className="text-red-500 mx-auto" />
                  </td>
                  <td className="text-center py-4 px-4">
                    <Check size={20} className="text-green-500 mx-auto" />
                  </td>
                  <td className="text-center py-4 px-4">
                    <Check size={20} className="text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-4">Analytics</td>
                  <td className="text-center py-4 px-4">
                    <X size={20} className="text-red-500 mx-auto" />
                  </td>
                  <td className="text-center py-4 px-4">
                    <Check size={20} className="text-green-500 mx-auto" />
                  </td>
                  <td className="text-center py-4 px-4">
                    <Check size={20} className="text-green-500 mx-auto" />
                  </td>
                  <td className="text-center py-4 px-4">
                    <Check size={20} className="text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4">Suporte</td>
                  <td className="text-center py-4 px-4">Email</td>
                  <td className="text-center py-4 px-4">Email</td>
                  <td className="text-center py-4 px-4">Prioritário</td>
                  <td className="text-center py-4 px-4">24/7</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-10 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Pronto para começar seu teste?
          </h3>
          <p className="mb-8 text-blue-100">
            Comece grátis, faça upgrade quando quiser. Sem compromisso!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Link
                href="/dashboard"
                className="bg-white text-blue-600 px-10 py-4 rounded-lg font-bold hover:bg-gray-100"
              >
                Acessar Dashboard
              </Link>
            ) : (
              <Link
                href="/auth"
                className="bg-white text-blue-600 px-10 py-4 rounded-lg font-bold hover:bg-gray-100"
              >
                Criar Conta Grátis
              </Link>
            )}
            <Link
              href="/pricing"
              className="border-2 border-white text-white px-10 py-4 rounded-lg font-bold hover:bg-blue-700/50"
            >
              Ver Planos Pagos
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}