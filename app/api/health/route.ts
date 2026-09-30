// app/api/health/route.ts
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  // Health check simples: só confirma que o servidor está de pé.
  // Não valida env vars nem serviços externos — isso derruba o deploy
  // do Render se qualquer variável estiver faltando.
  return NextResponse.json(
    {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    },
    { status: 200 }
  )
}