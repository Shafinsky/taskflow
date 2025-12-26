FROM node:20-alpine

WORKDIR /app

# 1. копіюємо лише package.json для кешу
COPY package*.json ./
COPY libs/user-core/package*.json ./libs/user-core/
COPY backend/package*.json ./backend/

# 2. встановлюємо залежності
RUN npm install

# 3. тепер копіюємо ВЕСЬ код
COPY libs ./libs
COPY backend ./backend

# 4. збираємо бібліотеку
RUN npm run build -w libs/user-core

# 5. генеруємо Prisma
WORKDIR /app/backend
RUN npx prisma generate

# 6. збираємо backend
RUN npm run build

CMD ["npm","run","start:prod"]