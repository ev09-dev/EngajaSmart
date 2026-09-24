# Stage 1: Dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm

# Copiar arquivos de dependências
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm

# Copiar dependências do stage anterior
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Configurar variáveis de ambiente para build
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# Build da aplicação
RUN pnpm build

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Criar usuário não-root para segurança
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar arquivos necessários
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

# Copiar apenas os arquivos de produção do Next.js
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Iniciar aplicação
CMD ["node", "server.js"]