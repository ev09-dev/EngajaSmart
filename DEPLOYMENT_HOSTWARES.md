# Deployment no Hostwares

## Pré-requisitos

- Conta ativa no Hostwares
- Node.js 20+ e pnpm 8+ instalados

## Configuração

O projeto já inclui o arquivo [`hostwares.json`](hostwares.json) com as configurações necessárias.

## Variáveis de Ambiente

Configure as seguintes variáveis de ambiente no painel do Hostwares:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# Resend
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=your_email@example.com

# Instagram
INSTAGRAM_APP_ID=your_instagram_app_id
INSTAGRAM_APP_SECRET=your_instagram_app_secret
INSTAGRAM_REDIRECT_URI=https://your-domain.com/auth/instagram/callback

# TikTok
TIKTOK_CLIENT_KEY=your_tiktok_client_key
TIKTOK_CLIENT_SECRET=your_tiktok_client_secret
TIKTOK_REDIRECT_URI=https://your-domain.com/auth/tiktok/callback

# AI Service
OPENROUTER_API_KEY=your_openrouter_key_here
AI_SERVICE_BASE_URL=https://openrouter.ai/api/v1

# Application
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## Processo de Deployment

### Via CLI do Hostwares

```bash
npm install -g @hostwares/cli
hostwares login
hostwares deploy
```

### Via Git

1. Faça push do código para o repositório Git
2. Conecte o repositório ao projeto no Hostwares
3. Configure o deploy automático

## Health Check

O endpoint [`/api/health`](app/api/health/route.ts) está configurado para monitoramento:

```bash
curl https://your-domain.com/api/health
```

## Docker Deployment

```bash
docker build -t engajasmart:latest .
docker run -p 3000:3000 engajasmart:latest
```

## Troubleshooting

### Build Falha
- Verifique se todas as dependências estão no [`package.json`](package.json)
- Certifique-se de que o Node.js 20+ está sendo usado

### Aplicação Não Inicia
- Verifique as variáveis de ambiente
- Confirme que a porta 3000 está disponível

### Health Check Falha
- Verifique se o endpoint [`/api/health`](app/api/health/route.ts) está respondendo
- Confirme que todas as variáveis de ambiente estão configuradas