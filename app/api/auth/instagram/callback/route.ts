import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const code = request.nextUrl.searchParams.get('code')
    const state = request.nextUrl.searchParams.get('state')

    if (!code) {
      return NextResponse.redirect('/dashboard?error=no_code')
    }

    // Trocar code por token
    const tokenResponse = await fetch('https://graph.instagram.com/v18.0/oauth/access_token', {
      method: 'POST',
      body: new URLSearchParams({
        client_id: process.env.INSTAGRAM_APP_ID!,
        client_secret: process.env.INSTAGRAM_APP_SECRET!,
        grant_type: 'authorization_code',
        redirect_uri: process.env.INSTAGRAM_REDIRECT_URI!,
        code,
      }),
    })

    const tokenData = await tokenResponse.json()

    if (tokenData.error) {
      console.error('Erro Instagram:', tokenData.error)
      return NextResponse.redirect('/dashboard?error=token_failed')
    }

    // Pegar dados do usuário
    const userResponse = await fetch(
      `https://graph.instagram.com/me?fields=username,name&access_token=${tokenData.access_token}`
    )

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
        platform: 'instagram',
        username: userData.username,
        access_token: tokenData.access_token,
      })

    if (error) {
      console.error('Erro ao salvar conta:', error)
      return NextResponse.redirect('/dashboard?error=save_failed')
    }

    return NextResponse.redirect('/dashboard?success=instagram_connected')
  } catch (error: any) {
    console.error('Erro no callback:', error.message)
    return NextResponse.redirect('/dashboard?error=callback_failed')
  }
}