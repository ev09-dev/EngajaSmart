'use client'

import Link from 'next/link'
import { ArrowRight, Zap, BarChart3, Shield, Sparkles, Instagram, Music } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block bg-blue-500/30 text-blue-100 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                🚀 Solução #1 em Engajamento
              </span>
              <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                Automatize Seus Engajamentos
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-10">
                Use IA para gerar respostas personalizadas. Aumente sua presença online.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/pricing"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition flex items-center justify-center gap-2"
                >
                  Comeca Agora <ArrowRight size={24} />
                </Link>
                <Link
                  href="/auth"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700/50 transition"
                >
                  Fazer Login
                </Link>
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <div className="bg-gradient-to-br from-blue-400 to-blue-300 rounded-2xl h-96 w-full flex items-center justify-center text-blue-900 text-2xl font-bold shadow-2xl">
                [Imagem Hero]
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Por Que Escolher EngajaSmart?
            </h2>
            <p className="text-xl text-gray-600">
              Tudo que você precisa para aumentar engajamento
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="bg-white p-10 rounded-xl shadow-lg hover:shadow-2xl transition hover:-translate-y-2">
              <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Sparkles size={32} className="text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">IA Inteligente</h3>
              <p className="text-gray-600 mb-6">
                Respostas personalizadas usando IA. Cada resposta é única e mantém sua voz.
              </p>
              <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center text-gray-500">
                [Imagem IA]
              </div>
            </div>

            <div className="bg-white p-10 rounded-xl shadow-lg hover:shadow-2xl transition hover:-translate-y-2">
              <div className="bg-green-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 size={32} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Analytics Avançado</h3>
              <p className="text-gray-600 mb-6">
                Dashboards com métricas em tempo real. Entenda o que funciona.
              </p>
              <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center text-gray-500">
                [Imagem Analytics]
              </div>
            </div>

            <div className="bg-white p-10 rounded-xl shadow-lg hover:shadow-2xl transition hover:-translate-y-2">
              <div className="bg-red-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Shield size={32} className="text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Segurança Total</h3>
              <p className="text-gray-600 mb-6">
                Dados 100% seguros. Criptografia e conformidade LGPD.
              </p>
              <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center text-gray-500">
                [Imagem Segurança]
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-blue-600 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 text-center">
            <div>
              <p className="text-5xl font-bold">50K+</p>
              <p className="text-blue-100">Comentários/Mês</p>
            </div>
            <div>
              <p className="text-5xl font-bold">98%</p>
              <p className="text-blue-100">Satisfação</p>
            </div>
            <div>
              <p className="text-5xl font-bold">5K+</p>
              <p className="text-blue-100">Criadores</p>
            </div>
            <div>
              <p className="text-5xl font-bold">24/7</p>
              <p className="text-blue-100">Suporte</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-32 px-4 bg-gray-50">
       <div className="max-w-7xl mx-auto text-center px-6 lg:px-8">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          Planos Acessíveis
       </h2>
       <p className="text-xl text-gray-600 mb-12">
          Comece grátis. Sem surpresas.
       </p>
       <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link
        href="/free-trial"
        className="bg-green-600 text-white px-10 py-4 rounded-lg font-bold hover:bg-green-700 inline-flex items-center gap-2"
      >
        Teste Grátis (7 dias) <ArrowRight size={24} />
      </Link>
      <Link
        href="/pricing"
        className="bg-blue-600 text-white px-10 py-4 rounded-lg font-bold hover:bg-blue-700 inline-flex items-center gap-2"
      >
        Ver Planos <ArrowRight size={24} />
      </Link>
    </div>
  </div>
</section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-8">
            Pronto Para Revolucionar?
          </h2>
          <p className="text-xl mb-12">
            Comece grátis. Sem cartão de crédito necessário.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pricing"
              className="bg-white text-blue-600 px-10 py-4 rounded-lg font-bold hover:bg-gray-100"
            >
              Começar Agora
            </Link>
            <Link
              href="/auth"
              className="border-2 border-white text-white px-10 py-4 rounded-lg font-bold hover:bg-blue-700/50"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h4 className="text-2xl font-bold mb-4">EngajaSmart</h4>
              <p className="text-gray-400">IA para engajamento social</p>
            </div>
            <div>
              <h5 className="font-bold mb-4">Produto</h5>
              <ul className="space-y-2">
                <li><Link href="/pricing" className="text-gray-400 hover:text-white">Planos</Link></li>
                <li><Link href="/#features" className="text-gray-400 hover:text-white">Features</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Legal</h5>
              <ul className="space-y-2">
                <li><Link href="/terms" className="text-gray-400 hover:text-white">Termos de Uso</Link></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacidade</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Suporte</h5>
              <ul className="space-y-2">
                <li><a href="mailto:support@engajasmart.com" className="text-gray-400 hover:text-white">Email</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">           
            <p className="text-center text-gray-400">
              &copy; 2026 EngajaSmart. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}