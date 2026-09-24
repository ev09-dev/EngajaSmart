# EngajaSmart

Plataforma de engajamento para redes sociais com automação de comentários usando IA.

## 🚀 Deployment

### Hostwares (Recomendado)

Este projeto está configurado para deployment na Hostwares. Veja o guia completo em [DEPLOYMENT_HOSTWARES.md](./DEPLOYMENT_HOSTWARES.md).

**Opções de Deployment:**

1. **GitHub Repository** - Auto-detecção de framework
2. **Dockerfile** - Controle total do build
3. **Docker Image** - Build local e deploy

**Configurações Auto-detectadas:**
- Build command: `pnpm install && pnpm build`
- Start command: `pnpm start`
- Port: `3000`
- Node version: `20`

### Variáveis de Ambiente

Copie `.env.example` para `.env` e configure as variáveis necessárias:

```bash
cp .env.example .env
```

## 📋 Pré-requisitos

- Node.js 20+
- pnpm 8+

## 🛠️ Desenvolvimento

```bash
# Instalar dependências
pnpm install

# Executar em desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Iniciar em produção
pnpm start

# Executar testes
pnpm test
```

## 🏗️ Estrutura do Projeto

- `app/` - Páginas e componentes Next.js
- `components/` - Componentes reutilizáveis
- `lib/` - Utilitários e configurações
- `contexts/` - Contextos React
- `supabase/` - Migrations do Supabase

## 🔧 Configuração

### Next.js

O projeto usa Next.js 15 com App Router. Configurações em `next.config.mjs`.

### TypeScript

Configuração em `tsconfig.json`.

### Tailwind CSS

Configuração em `tailwind.config.js`.

## 📝 Licença

Privado
