import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

// Gera uma string aleatória com caracteres permitidos (43–128 chars)
function generateRandomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// SHA256 hexadecimal do verifier (obrigatório: TikTok só aceita S256)
function generateCodeChallenge(verifier: string): string {
  return crypto.createHash('sha256').update(verifier).digest('hex')
}

export async function GET(request: NextRequest) {
  console.log('TIKTOK_CLIENT_KEY:', process.env.TIKTOK_CLIENT_KEY)
  console.log('TIKTOK_REDIRECT_URI:', process.env.TIKTOK_REDIRECT_URI)
  const clientKey = process.env.TIKTOK_CLIENT_KEY || process.env.TIKTOK_CLIENT_ID
  const redirectUri = process.env.TIKTOK_REDIRECT_URI

  if (!clientKey || !redirectUri) {
    return NextResponse.json(
      { error: 'Configuração TikTok ausente (TIKTOK_CLIENT_KEY / TIKTOK_REDIRECT_URI)' },
      { status: 500 }
    )
  }

  // 1. Gerar state (proteção CSRF)
  const state = crypto.randomBytes(16).toString('hex')

  // 2. Gerar PKCE — novo verifier a cada pedido
  const codeVerifier = generateRandomString(64)
  const codeChallenge = generateCodeChallenge(codeVerifier)

  // 3. Construir URL v2 de autorização
  const authUrl = new URL('https://www.tiktok.com/v2/auth/authorize/')
  authUrl.searchParams.set('client_key', clientKey)
  authUrl.searchParams.set('response_type', 'code')
  authUrl.searchParams.set('scope', 'user.info.basic,video.list')
  authUrl.searchParams.set('redirect_uri', redirectUri)
  authUrl.searchParams.set('state', state)
  authUrl.searchParams.set('code_challenge', codeChallenge)
  authUrl.searchParams.set('code_challenge_method', 'S256')

  // 4. Guardar verifier e state em cookies HttpOnly (temporários)
  const response = NextResponse.redirect(authUrl.toString())

  response.cookies.set('tiktok_pkce_verifier', codeVerifier, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 600, // 10 minutos
    path: '/',
  })

  response.cookies.set('tiktok_oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 600,
    path: '/',
  })

  return response
}