import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { parseSignedRequest } from '@/lib/instagram/signedRequest';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    // O Instagram envia como form-urlencoded
    const formData = await req.formData();
    const signedRequest = formData.get('signed_request') as string | null;

    if (!signedRequest) {
      console.warn('[Deauthorize] signed_request ausente');
      return new NextResponse('OK', { status: 200 });
    }

    const appSecret = process.env.INSTAGRAM_APP_SECRET;
    if (!appSecret) {
      console.error('[Deauthorize] INSTAGRAM_APP_SECRET não configurado');
      return new NextResponse('OK', { status: 200 });
    }

    const data = parseSignedRequest(signedRequest, appSecret);
    if (!data) {
      // Mesmo com assinatura inválida, devolvemos 200 para evitar re-tentativas
      return new NextResponse('OK', { status: 200 });
    }

    const scopedId = data.user_id; // App-Scoped ID
    console.log(`[Deauthorize] Utilizador desautorizou. ASID: ${scopedId}`);

    // Atualiza TODAS as contas Instagram com este ASID
    const { error } = await supabaseAdmin
      .from('social_accounts')
      .update({
        is_active: false,
        deauthorized_at: new Date().toISOString(),
      })
      .eq('platform', 'instagram')
      .eq('platform_scoped_id', scopedId);

    if (error) {
      console.error('[Deauthorize] Erro Supabase:', error);
      // Devolvemos 200 mesmo assim para o Instagram não re-tentar em loop
    }

    return new NextResponse('OK', { status: 200 });
  } catch (err) {
    console.error('[Deauthorize] Erro inesperado:', err);
    return new NextResponse('OK', { status: 200 });
  }
}

// O Instagram também pode fazer GET de verificação (opcional)
export async function GET() {
  return new NextResponse('Deauthorize endpoint ativo', { status: 200 });
}