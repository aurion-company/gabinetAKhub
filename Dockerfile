# ==========================================
# Dockerfile — GabinetAK HUB (Next.js Standalone Build)
# ==========================================

# 1. DEPENDÊNCIAS
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copia manifests de dependências
COPY package*.json ./

# Instala dependências
RUN npm install --legacy-peer-deps

# 2. BUILD
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

# Executa prisma generate apenas se a pasta/schema prisma existir
RUN if [ -d "./prisma" ]; then npx prisma generate; fi

# Compila o Next.js
RUN npm run build

# 3. RUNNER DE PRODUÇÃO
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copia assets e standalone
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
