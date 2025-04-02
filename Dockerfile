FROM node:23.10.0-alpine AS builder

WORKDIR /app

COPY pnpm-lock.yaml .
COPY package*.json .

RUN npm install -g pnpm
RUN pnpm install

COPY . .

RUN pnpm run build

FROM node:23.10.0-alpine AS runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package.json .

CMD ["node", "dist/index.js"]