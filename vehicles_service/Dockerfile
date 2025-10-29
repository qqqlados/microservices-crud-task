FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3001

CMD ["node", "dist/src/main.js"]
