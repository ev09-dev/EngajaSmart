import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const redirectUri = process.env.INSTAGRAM_REDIRECT_URI
  const appId = process.env.INSTAGRAM_APP_ID

  const params = new URLSearchParams({
    client_id: appId!,
    redirect_uri: redirectUri!,
    scope: 'instagram_business_basic,instagram_business_content_publish',
    response_type: 'code',
  })

 const instagramAuthUrl = `https://www.instagram.com/oauth/authorize?${params.toString()}`
  return NextResponse.redirect(instagramAuthUrl)
}