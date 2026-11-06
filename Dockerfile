# ==========================================
# Dockerfile — GabinetAK HUB (Next.js Standalone Build)
# ==========================================

FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat git
WORKDIR /app

# Copia arquivos do contexto local
COPY . .

# Se package.json não existir no contexto de build do Coolify, clona diretamente do GitHub
RUN if [ ! -f "package.json" ]; then \
      echo "==> package.json não encontrado no contexto local. Clonando do GitHub..." && \
      git clone --depth 1 https://github.com/aurion-company/gabinetAKhub.git /tmp/repo && \
      cp -r /tmp/repo/. /app/ && \
      rm -rf /tmp/repo && \
      echo "==> Repositório clonado com sucesso!"; \
    fi

ENV NEXT_TELEMETRY_DISABLED=1

# Instala dependências
RUN npm install --legacy-peer-deps

# Executa prisma generate se o schema existir
RUN if [ -d "./prisma" ]; then npx prisma generate; fi

# Compila o Next.js
RUN npm run build

# ==========================================
# 2. RUNNER DE PRODUÇÃO
# ==========================================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copia assets e aplicação standalone gerada pelo Next.js
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
