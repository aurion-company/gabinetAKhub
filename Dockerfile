# Dockerfile — GestãoPolítica360 (Next.js Production Build para Hetzner VPS + Coolify)

FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci --quiet || npm install --quiet

# Copy application source
COPY . .

# Generate Prisma Client & Next.js Standalone Build
RUN npx prisma generate
RUN npm run build

EXPOSE 3000

ENV PORT 3000
ENV NODE_ENV production

CMD ["npm", "run", "start"]
