# Nuxt Minimal Starter

 Деплой проекта на продакшн сервер (Ubuntu + PM2 + Nginx)

Подготовка сервера  
Обновите систему и установите нужные пакеты:

sudo apt update && sudo apt upgrade -y
sudo apt install curl git nodejs npm nginx -y
npm install -g pm2

Клонирование репозитория и установка зависимостей
git clone https://github.com/your-repo/nuxt-app.git
cd nuxt-app
npm install


Сборка и запуск в продакшн-режиме

npm run build
pm2 start npm --name "nuxt-app" -- start
pm2 save
pm2 startup



## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
