import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const code = request.nextUrl.searchParams.get('code')

    if (!code) {
      return NextResponse.redirect('/dashboard?error=no_code')
    }

    // Trocar code por token
    const tokenResponse = await fetch('https://open.tiktokapis.com/v1/oauth/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_key: process.env.TIKTOK_CLIENT_ID!,
        client_secret: process.env.TIKTOK_CLIENT_SECRET!,
        code,
        grant_type: 'authorization_code',
        redirect_uri: process.env.TIKTOK_REDIRECT_URI!,
      }),
    })

    const tokenData = await tokenResponse.json()

    if (tokenData.error) {
      console.error('Erro TikTok:', tokenData.error)
      return NextResponse.redirect('/dashboard?error=token_failed')
    }

    // Pegar dados do usuário
    const userResponse = await fetch('https://open.tiktokapis.com/v1/user/info/', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })

    const userData = await userResponse.json()

    // Pegar user_id do Supabase
    const { data: authUser } = await supabase.auth.getSession()
    const userId = authUser?.session?.user?.id

    if (!userId) {
      return NextResponse.redirect('/dashboard?error=not_authenticated')
    }

    // Salvar no banco
    const { error } = await supabase
      .from('social_accounts')
      .insert({
        user_id: userId,
        platform: 'tiktok',
        username: userData.data.user.username,
        access_token: tokenData.access_token,
      })

    if (error) {
      console.error('Erro ao salvar conta:', error)
      return NextResponse.redirect('/dashboard?error=save_failed')
    }

    return NextResponse.redirect('/dashboard?success=tiktok_connected')
  } catch (error: any) {
    console.error('Erro no callback:', error.message)
    return NextResponse.redirect('/dashboard?error=callback_failed')
  }
}