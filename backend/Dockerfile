FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

# 1. Копіюємо package файли
COPY package*.json ./

# 2. Ставимо залежності
RUN npm ci

# 3. Копіюємо ВСІ файли
COPY . .

# 4. БУДУЄМО NestJS (ЦЕ КЛЮЧОВЕ)
RUN npm run build

# 5. Відкриваємо порт (інформаційно)
EXPOSE 3000

# 6. Запуск
CMD ["node", "dist/main.js"]