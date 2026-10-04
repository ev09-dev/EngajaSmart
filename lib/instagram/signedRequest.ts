import crypto from 'crypto';

export interface SignedRequestPayload {
  algorithm: string;
  issued_at: number;
  user_id: string;      // App-Scoped ID (ASID)
  expires?: number;
}

function base64UrlDecode(input: string): string {
  const base64 = input.replace(/-/g, '+').replace(/_/g, '/');
  const pad = base64.length % 4 === 0 ? '' : '='.repeat(4 - (base64.length % 4));
  return Buffer.from(base64 + pad, 'base64').toString('utf-8');
}

function base64UrlEncode(buffer: Buffer): string {
  return buffer
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Valida o signed_request enviado pelo Instagram e devolve o payload.
 * Retorna null se a assinatura for inválida.
 */
export function parseSignedRequest(
  signedRequest: string,
  appSecret: string
): SignedRequestPayload | null {
  if (!signedRequest || !signedRequest.includes('.')) return null;

  const [encodedSig, payload] = signedRequest.split('.', 2);
  if (!encodedSig || !payload) return null;

  // Assinatura esperada (HMAC-SHA256 do payload, com o App Secret)
  const expectedSig = base64UrlEncode(
    crypto.createHmac('sha256', appSecret).update(payload).digest()
  );

  // Comparação em tempo constante
  const a = Buffer.from(encodedSig);
  const b = Buffer.from(expectedSig);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    console.error('[Instagram] Assinatura inválida no signed_request');
    return null;
  }

  try {
    return JSON.parse(base64UrlDecode(payload)) as SignedRequestPayload;
  } catch (err) {
    console.error('[Instagram] Falha ao decodificar payload:', err);
    return null;
  }
}