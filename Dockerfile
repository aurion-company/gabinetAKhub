# ==========================================
# Dockerfile — GabinetAK HUB (Next.js Standalone Build)
# ==========================================

FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat git openssl
WORKDIR /app

# Invalida o cache para garantir que sempre baixe a última versão do master
ARG CACHEBUST=20261106_v8

# Copia arquivos do contexto local se existirem
COPY . .

# Garante que o repositório completo e atualizado do GitHub esteja presente no build
RUN echo "==> Verificando e atualizando código fonte do GabinetAK HUB..." && \
    rm -rf /tmp/repo && \
    git clone --depth 1 -b master https://github.com/aurion-company/gabinetAKhub.git /tmp/repo && \
    cp -rf /tmp/repo/. /app/ && \
    rm -rf /tmp/repo && \
    echo "==> Repositório sincronizado com sucesso!"

ENV NEXT_TELEMETRY_DISABLED=1

# Instala dependências
RUN npm install --legacy-peer-deps

# Executa prisma generate se o schema existir
RUN if [ -d "./prisma" ]; then npx prisma generate; fi

# Compila o Next.js (Gera a Home do Cidadão na rota / e o painel em /app)
RUN npm run build

# ==========================================
# 2. RUNNER DE PRODUÇÃO
# ==========================================
FROM node:20-alpine AS runner
RUN apk add --no-cache libc6-compat openssl
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
