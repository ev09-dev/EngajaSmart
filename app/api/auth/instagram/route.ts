// app/api/auth/instagram/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    `${request.nextUrl.protocol}//${request.nextUrl.host}`

  // 🔑 1. Pega o user_id da sessão do Supabase (via cookies)
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
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.redirect(new URL('/login?error=not_authenticated', baseUrl))
  }

  // 🔑 2. Codifica o user_id em base64 para o state
  const state = Buffer.from(
    JSON.stringify({
      uid: user.id,
      ts: Date.now(), // timestamp para expiração simples
    })
  ).toString('base64url')

  // 🔑 3. Monta a URL do OAuth do Instagram
  const instagramAuthUrl = new URL('https://api.instagram.com/oauth/authorize')
  instagramAuthUrl.searchParams.set('client_id', process.env.INSTAGRAM_APP_ID!)
  instagramAuthUrl.searchParams.set('redirect_uri', process.env.INSTAGRAM_REDIRECT_URI!)
  instagramAuthUrl.searchParams.set('scope', 'user_profile,user_media')
  instagramAuthUrl.searchParams.set('response_type', 'code')
  instagramAuthUrl.searchParams.set('state', state)

  return NextResponse.redirect(instagramAuthUrl.toString())
}