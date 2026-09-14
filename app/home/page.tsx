'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <main className="min-h-screen">
      {/* Header/Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#9FA1FF] to-[#AEE2FF] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <span className="text-white font-bold text-xl">EngajaSmart</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/home" className="text-white/90 hover:text-white transition-colors">Início</Link>
              <Link href="/home#features" className="text-white/90 hover:text-white transition-colors">Recursos</Link>
              <Link href="/home#pricing" className="text-white/90 hover:text-white transition-colors">Preços</Link>
              <Link href="/privacy" className="text-white/90 hover:text-white transition-colors">Privacidade</Link>
              <Link href="/terms" className="text-white/90 hover:text-white transition-colors">Termos</Link>
            </nav>
            <div className="flex items-center gap-4">
              <Link 
                href="/auth/signin" 
                className="text-white/90 hover:text-white transition-colors"
              >
                Entrar
              </Link>
              <Link 
                href="/auth/signin" 
                className="px-4 py-2 bg-[#9FA1FF] text-white rounded-lg font-semibold hover:bg-[#8A8CE8] transition-colors"
              >
                Começar
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Engajamento Inteligente para
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9FA1FF] to-[#AEE2FF]">
                Criadores de Conteúdo
              </span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-10">
              Centralize comentários do Instagram e TikTok, priorize os relevantes e obtenha sugestões de resposta 
              com IA no seu próprio tom de voz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/auth/signin" 
                className="px-8 py-4 bg-[#9FA1FF] text-white rounded-lg font-semibold hover:bg-[#8A8CE8] transition-colors text-lg"
              >
                Começar Gratuitamente
              </Link>
              <Link 
                href="/home#features" 
                className="px-8 py-4 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors text-lg border border-white/20"
              >
                Ver Recursos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Recursos Poderosos
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Tudo que você precisa para gerenciar seu engajamento de forma eficiente
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-[#9FA1FF] to-[#AEE2FF] rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Feed Unificado</h3>
              <p className="text-white/70">
                Todos os comentários do Instagram e TikTok em um só lugar, ordenados por relevância e prioridade.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-[#AEE2FF] to-[#9FA1FF] rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Respostas com IA</h3>
              <p className="text-white/70">
                Sugestões de resposta personalizadas que mantêm seu tom de voz e estilo único de comunicação.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-[#D9F9DF] to-[#AEE2FF] rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Filtros Inteligentes</h3>
              <p className="text-white/70">
                Detecção automática de spam e gerenciamento de comentários baseado em prioridade.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-[#9FA1FF] to-[#D9F9DF] rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Respostas Rápidas</h3>
              <p className="text-white/70">
                Responda em segundos com sugestões inteligentes e mantenha o engajamento alto.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-[#AEE2FF] to-[#D9F9DF] rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Analytics Avançado</h3>
              <p className="text-white/70">
                Acompanhe métricas de engajamento e identifique tendências para melhorar sua estratégia.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-[#D9F9DF] to-[#9FA1FF] rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Segurança Total</h3>
              <p className="text-white/70">
                Seus dados estão protegidos com criptografia de ponta a ponta e conformidade com LGPD.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Planos Flexíveis
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Escolha o plano ideal para suas necessidades
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-2">Gratuito</h3>
              <p className="text-white/60 mb-6">Para começar</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">R$0</span>
                <span className="text-white/60">/mês</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-white/80">
                  <svg className="w-5 h-5 mr-3 text-[#D9F9DF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  1 conta social
                </li>
                <li className="flex items-center text-white/80">
                  <svg className="w-5 h-5 mr-3 text-[#D9F9DF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  50 comentários/mês
                </li>
                <li className="flex items-center text-white/80">
                  <svg className="w-5 h-5 mr-3 text-[#D9F9DF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Sugestões básicas
                </li>
              </ul>
              <Link 
                href="/auth/signin" 
                className="block w-full py-3 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors text-center border border-white/20"
              >
                Começar Grátis
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-[#9FA1FF]/20 to-[#AEE2FF]/20 backdrop-blur-md rounded-2xl p-8 border-2 border-[#9FA1FF] relative transform scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#9FA1FF] text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Mais Popular
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Profissional</h3>
              <p className="text-white/60 mb-6">Para criadores ativos</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">R$49</span>
                <span className="text-white/60">/mês</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-white/80">
                  <svg className="w-5 h-5 mr-3 text-[#D9F9DF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  5 contas sociais
                </li>
                <li className="flex items-center text-white/80">
                  <svg className="w-5 h-5 mr-3 text-[#D9F9DF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  500 comentários/mês
                </li>
                <li className="flex items-center text-white/80">
                  <svg className="w-5 h-5 mr-3 text-[#D9F9DF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Sugestões avançadas
                </li>
                <li className="flex items-center text-white/80">
                  <svg className="w-5 h-5 mr-3 text-[#D9F9DF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Analytics completo
                </li>
              </ul>
              <Link 
                href="/auth/signin" 
                className="block w-full py-3 bg-[#9FA1FF] text-white rounded-lg font-semibold hover:bg-[#8A8CE8] transition-colors text-center"
              >
                Assinar Agora
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-2">Empresarial</h3>
              <p className="text-white/60 mb-6">Para equipes</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">R$149</span>
                <span className="text-white/60">/mês</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-white/80">
                  <svg className="w-5 h-5 mr-3 text-[#D9F9DF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Contas ilimitadas
                </li>
                <li className="flex items-center text-white/80">
                  <svg className="w-5 h-5 mr-3 text-[#D9F9DF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Comentários ilimitados
                </li>
                <li className="flex items-center text-white/80">
                  <svg className="w-5 h-5 mr-3 text-[#D9F9DF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  API personalizada
                </li>
                <li className="flex items-center text-white/80">
                  <svg className="w-5 h-5 mr-3 text-[#D9F9DF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Suporte prioritário
                </li>
              </ul>
              <Link 
                href="/auth/signin" 
                className="block w-full py-3 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors text-center border border-white/20"
              >
                Falar com Vendas
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-[#9FA1FF]/20 to-[#AEE2FF]/20 backdrop-blur-md rounded-3xl p-12 border border-white/20">
            <h2 className="text-4xl font-bold text-white mb-4">
              Pronto para Transformar seu Engajamento?
            </h2>
            <p className="text-xl text-white/70 mb-8">
              Junte-se a milhares de criadores que já estão usando o EngajaSmart
            </p>
            <Link 
              href="/auth/signin" 
              className="inline-block px-8 py-4 bg-[#9FA1FF] text-white rounded-lg font-semibold hover:bg-[#8A8CE8] transition-colors text-lg"
            >
              Começar Agora - É Grátis
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#9FA1FF] to-[#AEE2FF] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">E</span>
                </div>
                <span className="text-white font-bold text-xl">EngajaSmart</span>
              </div>
              <p className="text-white/60">
                Engajamento inteligente para criadores de conteúdo.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Produto</h4>
              <ul className="space-y-2">
                <li><Link href="/home#features" className="text-white/60 hover:text-white transition-colors">Recursos</Link></li>
                <li><Link href="/home#pricing" className="text-white/60 hover:text-white transition-colors">Preços</Link></li>
                <li><Link href="/dashboard" className="text-white/60 hover:text-white transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-white/60 hover:text-white transition-colors">Privacidade</Link></li>
                <li><Link href="/terms" className="text-white/60 hover:text-white transition-colors">Termos de Uso</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2">
                <li><Link href="/auth/signin" className="text-white/60 hover:text-white transition-colors">Entrar</Link></li>
                <li><Link href="/auth/signin" className="text-white/60 hover:text-white transition-colors">Cadastrar</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center">
            <p className="text-white/60">
              © 2024 EngajaSmart. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}