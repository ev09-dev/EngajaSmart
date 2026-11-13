// app/api/auth/instagram/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    `${request.nextUrl.protocol}//${request.nextUrl.host}`

  const cookieStore = await cookies()

  // Array para acumular cookies que o Supabase queira definir
  const pendingCookies: { name: string; value: string; options: any }[] = []

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          // Em vez de cookieStore.set(), acumulamos para aplicar no response
          cookiesToSet.forEach((cookie) => pendingCookies.push(cookie))
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Função auxiliar para criar a resposta e aplicar os cookies acumulados
  const buildResponse = (response: NextResponse) => {
    pendingCookies.forEach(({ name, value, options }) => {
      response.cookies.set(name, value, options)
    })
    return response
  }

  if (!user) {
    const loginUrl = new URL('/login?error=not_authenticated', baseUrl)
    return buildResponse(NextResponse.redirect(loginUrl))
  }

  // Codifica o user_id em base64 para o state
  const state = Buffer.from(
    JSON.stringify({
      uid: user.id,
      ts: Date.now(),
    })
  ).toString('base64url')

  // Monta a URL do OAuth do Instagram
  const instagramAuthUrl = new URL('https://api.instagram.com/oauth/authorize')
  instagramAuthUrl.searchParams.set('client_id', process.env.INSTAGRAM_APP_ID!)
  instagramAuthUrl.searchParams.set('redirect_uri', process.env.INSTAGRAM_REDIRECT_URI!)
  instagramAuthUrl.searchParams.set('scope', 'user_profile,user_media')
  instagramAuthUrl.searchParams.set('response_type', 'code')
  instagramAuthUrl.searchParams.set('state', state)
  // Adicione #weblink para evitar sequestro pelo app do Instagram em mobile
  // instagramAuthUrl.hash = 'weblink'

  return buildResponse(NextResponse.redirect(instagramAuthUrl.toString()))
}