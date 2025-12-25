FROM node:20-alpine

WORKDIR /app

# 1. копіюємо root package.json
COPY package*.json ./

# 2. копіюємо package.json з workspace
COPY backend/package*.json ./backend/
COPY libs/user-core/package*.json ./libs/user-core/

# 3. встановлюємо залежності для всієї монорепи
RUN npm install --workspaces

# 4. копіюємо весь код
COPY . .

# 5. prisma
WORKDIR /app/backend
RUN npx prisma generate

# 6. build backend
RUN npm run build

EXPOSE 3000
CMD ["node","dist/main.js"]