FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./

# Сначала ставим всё, потом доставляем проблемный пакет для Linux
RUN npm install
RUN npm install @rollup/rollup-linux-x64-musl

COPY . .
RUN npm run build

FROM nginx:latest
# Копируем билд
COPY --from=builder /app/dist /usr/share/nginx/html
# Копируем конфиг (теперь путь верный, так как папка nginx внутри frontend)
COPY ./nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]