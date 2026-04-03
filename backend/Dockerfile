# Stage 1: Сборка
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Финальный образ
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
# Устанавливаем только продакшн зависимости
RUN npm install --omit=dev
# Копируем только собранный код из предыдущего этапа
COPY --from=builder /app/dist ./dist
# Если у тебя есть статика (картинки фильмов), ее тоже надо скопировать
COPY --from=builder /app/public ./public 

CMD ["node", "dist/main.js"]