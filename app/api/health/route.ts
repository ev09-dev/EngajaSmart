import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Verificar conexão com Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    // Verificar variáveis de ambiente essenciais
    const envChecks = {
      supabase: !!(supabaseUrl && supabaseKey),
      stripe: !!process.env.STRIPE_SECRET_KEY,
      resend: !!process.env.RESEND_API_KEY,
      instagram: !!process.env.INSTAGRAM_APP_SECRET,
      tiktok: !!process.env.TIKTOK_CLIENT_SECRET,
      ai: !!process.env.OPENROUTER_API_KEY,
    }

    const allEnvValid = Object.values(envChecks).every(check => check)

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0',
      services: {
        database: envChecks.supabase ? 'connected' : 'disconnected',
        payment: envChecks.stripe ? 'configured' : 'not configured',
        email: envChecks.resend ? 'configured' : 'not configured',
        instagram: envChecks.instagram ? 'configured' : 'not configured',
        tiktok: envChecks.tiktok ? 'configured' : 'not configured',
        ai: envChecks.ai ? 'configured' : 'not configured',
      },
      uptime: process.uptime(),
    }, {
      status: allEnvValid ? 200 : 503,
    })
  } catch (error) {
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
    }, {
      status: 503,
    })
  }
}