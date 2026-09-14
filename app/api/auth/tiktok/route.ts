import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function GET(request: NextRequest) {
  const clientId = process.env.TIKTOK_CLIENT_ID
  const redirectUri = process.env.TIKTOK_REDIRECT_URI
  
  // Gerar state para segurança
  const state = crypto.randomBytes(16).toString('hex')

  const params = new URLSearchParams({
    client_key: clientId!,
    response_type: 'code',
    scope: 'user.info.basic,video.list',
    redirect_uri: redirectUri!,
    state,
  })

  const tiktokAuthUrl = `https://www.tiktok.com/v1/oauth/authorize?${params.toString()}`

  return NextResponse.redirect(tiktokAuthUrl)
}