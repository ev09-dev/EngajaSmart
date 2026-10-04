import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { parseSignedRequest } from '@/lib/instagram/signedRequest';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const signedRequest = formData.get('signed_request') as string | null;

    if (!signedRequest) {
      return NextResponse.json(
        { error: 'Missing signed_request' },
        { status: 400 }
      );
    }

    const appSecret = process.env.INSTAGRAM_APP_SECRET;
    if (!appSecret) {
      return NextResponse.json(
        { error: 'Server misconfigured' },
        { status: 500 }
      );
    }

    const data = parseSignedRequest(signedRequest, appSecret);
    if (!data) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    const scopedId = data.user_id; // App-Scoped ID
    console.log(`[DeleteData] Pedido de exclusão. ASID: ${scopedId}`);

    // Gera código único de confirmação
    const confirmationCode = `del_${Date.now()}_${Math.random()
      .toString(36)
      .slice(2, 10)}`;

    // 1. Procura a conta pelo ASID
    const { data: account, error: fetchError } = await supabaseAdmin
      .from('social_accounts')
      .select('id, user_id, platform, username')
      .eq('platform', 'instagram')
      .eq('platform_scoped_id', scopedId)
      .maybeSingle();

    if (fetchError) {
      console.error('[DeleteData] Erro ao buscar conta:', fetchError);
    }

    // 2. Estratégia de exclusão
    if (account) {
      // ANONIMIZA os dados em vez de apagar a linha,
      // para manteres o histórico de auditoria (recomendado para compliance).
      const { error: updateError } = await supabaseAdmin
        .from('social_accounts')
        .update({
          username: null,
          access_token: null,
          refresh_token: null,
          token_expires_at: null,
          platform_user_id: null,
          platform_scoped_id: null,
          is_active: false,
          deletion_requested_at: new Date().toISOString(),
        })
        .eq('id', account.id);

      if (updateError) {
        console.error('[DeleteData] Erro ao anonimizar:', updateError);
      } else {
        console.log(`[DeleteData] Conta ${account.id} anonimizada`);
      }

      // Se quiseres apagar mesmo, substitui o bloco acima por:
      // await supabaseAdmin.from('social_accounts').delete().eq('id', account.id);
    } else {
      console.warn(`[DeleteData] Conta não encontrada para ASID: ${scopedId}`);
      // Mesmo assim devolvemos sucesso — o Instagram não pode ficar em loop
    }

    // 3. Resposta OBRIGATÓRIA no formato do Instagram
    const statusUrl = `https://${req.headers.get('host')}/deletion-status?id=${confirmationCode}`;

    return NextResponse.json(
      {
        url: statusUrl,
        confirmation_code: confirmationCode,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('[DeleteData] Erro inesperado:', err);
    return NextResponse.json(
      { error: 'Internal error' },
      { status: 500 }
    );
  }
}