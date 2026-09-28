// app/api/auth/instagram/callback/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Validade do state: 10 minutos (proteção simples contra replay)
const STATE_MAX_AGE_MS = 10 * 60 * 1000

function decodeState(state: string | null): { uid: string; ts: number } | null {
  if (!state) return null
  try {
    const json = Buffer.from(state, 'base64url').toString('utf-8')
    const parsed = JSON.parse(json)
    if (typeof parsed.uid !== 'string' || typeof parsed.ts !== 'number') return null
    return parsed
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    `${request.nextUrl.protocol}//${request.nextUrl.host}`

  const redirectTo = (path: string) =>
    NextResponse.redirect(new URL(path, baseUrl))

  try {
    const code = request.nextUrl.searchParams.get('code')
    const stateRaw = request.nextUrl.searchParams.get('state')

    if (!code) {
      return redirectTo('/dashboard?error=no_code')
    }

    // 🔑 1. Decodifica o state → user_id
    const state = decodeState(stateRaw)
    if (!state) {
      console.error('State inválido:', stateRaw)
      return redirectTo('/dashboard?error=invalid_state')
    }

    // 🔑 2. Verifica expiração
    if (Date.now() - state.ts > STATE_MAX_AGE_MS) {
      console.error('State expirado')
      return redirectTo('/dashboard?error=state_expired')
    }

    const userId = state.uid

    // 🔑 3. Troca code por access_token
    const tokenResponse = await fetch(
      'https://graph.instagram.com/v18.0/oauth/access_token',
      {
        method: 'POST',
        body: new URLSearchParams({
          client_id: process.env.INSTAGRAM_APP_ID!,
          client_secret: process.env.INSTAGRAM_APP_SECRET!,
          grant_type: 'authorization_code',
          redirect_uri: process.env.INSTAGRAM_REDIRECT_URI!,
          code,
        }),
      }
    )

    const tokenData = await tokenResponse.json()

    if (tokenData.error) {
      console.error('Erro Instagram:', tokenData.error)
      return redirectTo('/dashboard?error=token_failed')
    }

    // 🔑 4. Pega dados do usuário do Instagram
    const userResponse = await fetch(
      `https://graph.instagram.com/me?fields=username,name&access_token=${tokenData.access_token}`
    )
    const userData = await userResponse.json()

    // 🔑 5. Salva no Supabase
    const { error } = await supabase.from('social_accounts').insert({
      user_id: userId,
      platform: 'instagram',
      username: userData.username,
      access_token: tokenData.access_token,
    })

    if (error) {
      console.error('Erro ao salvar conta:', error)
      return redirectTo('/dashboard?error=save_failed')
    }

    return redirectTo('/dashboard?success=instagram_connected')
  } catch (error: any) {
    console.error('Erro no callback:', error.message)
    return redirectTo('/dashboard?error=callback_failed')
  }
}