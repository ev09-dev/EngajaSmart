import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  console.log('[TIKTOK CALLBACK] Recebido:', request.url)
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const error = searchParams.get('error')

  // Se o utilizador recusou a autorização
  if (error) {
    return NextResponse.redirect(
      new URL(`/dashboard?error=${encodeURIComponent(error)}`, request.url)
    )
  }

  // 1. Validar parâmetros obrigatórios
  if (!code || !state) {
    return NextResponse.redirect(
      new URL('/dashboard?error=missing_params', request.url)
    )
  }

  // 2. Ler os cookies guardados pelo /api/auth/tiktok
  const storedState = request.cookies.get('tiktok_oauth_state')?.value
  const codeVerifier = request.cookies.get('tiktok_pkce_verifier')?.value

  // 3. Validar state (proteção CSRF)
  if (!storedState || state !== storedState) {
    return NextResponse.redirect(
      new URL('/dashboard?error=invalid_state', request.url)
    )
  }

  // 4. Validar que o verifier existe
  if (!codeVerifier) {
    return NextResponse.redirect(
      new URL('/dashboard?error=missing_verifier', request.url)
    )
  }

    // 5. Configuração do TikTok
  const clientKey = process.env.TIKTOK_CLIENT_KEY || process.env.TIKTOK_CLIENT_ID
  const clientSecret = process.env.TIKTOK_CLIENT_SECRET
  const redirectUri = process.env.TIKTOK_REDIRECT_URI

  // 🔍 LOG DE DIAGNÓSTICO — colocar aqui
  console.log('[TIKTOK CALLBACK] env check:', {
    hasClientKey: !!process.env.TIKTOK_CLIENT_KEY,
    hasClientId: !!process.env.TIKTOK_CLIENT_ID,
    hasClientSecret: !!process.env.TIKTOK_CLIENT_SECRET,
    redirectUriValue: process.env.TIKTOK_REDIRECT_URI,
    resolvedClientKey: clientKey ? `${clientKey.slice(0, 6)}...` : 'AUSENTE',
    resolvedSecret: clientSecret ? 'presente' : 'AUSENTE',
    resolvedRedirectUri: redirectUri || 'AUSENTE',
  })

  if (!clientKey || !clientSecret || !redirectUri) {
    return NextResponse.redirect(
      new URL('/dashboard?error=server_config', request.url)
    )
  }
  try {
    // 6. Trocar o code por tokens
    const tokenResponse = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cache-Control': 'no-cache',
      },
      body: new URLSearchParams({
        client_key: clientKey,
        client_secret: clientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
        code_verifier: codeVerifier, // ← PKCE obrigatório para Desktop
      }),
    })

    const tokenData = await tokenResponse.json()

    if (!tokenResponse.ok || tokenData.error) {
      console.error('Erro TikTok token:', tokenData)
      return NextResponse.redirect(
        new URL(`/dashboard?error=${encodeURIComponent(tokenData.error || 'token_failed')}`, request.url)
      )
    }

    // 7. Obter o cliente Supabase com a sessão do utilizador
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          },
        },
      }
    )

    // 8. Confirmar que o utilizador está autenticado
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.redirect(
        new URL('/login?error=not_authenticated', request.url)
      )
    }

    // 9. Inserir a conta na tabela social_accounts
    const { error: insertError } = await supabase
      .from('social_accounts')
      .insert({
        user_id: user.id,
        platform: 'tiktok',
        username: tokenData.open_id, // ou display_name se buscares via /v2/user/info/
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token,
        expires_at: new Date(Date.now() + tokenData.expires_in * 1000).toISOString(),
      })

    if (insertError) {
      console.error('Erro ao guardar conta TikTok:', insertError)
      return NextResponse.redirect(
        new URL('/dashboard?error=save_failed', request.url)
      )
    }

    console.log('TikTok autenticado e guardado:', {
      open_id: tokenData.open_id,
      scope: tokenData.scope,
      expires_in: tokenData.expires_in,
    })

    // 10. Limpar cookies temporários e redirecionar
    const response = NextResponse.redirect(
      new URL('/dashboard?connected=tiktok', request.url)
    )
    response.cookies.delete('tiktok_oauth_state')
    response.cookies.delete('tiktok_pkce_verifier')

    return response
  } catch (err) {
    console.error('Erro na troca de token TikTok:', err)
    return NextResponse.redirect(
      new URL('/dashboard?error=exchange_failed', request.url)
    )
  }
}