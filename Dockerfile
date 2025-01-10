# Use a imagem base do Node.js
FROM node:16

# Crie e defina o diretório de trabalho no container
WORKDIR /app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie todos os arquivos TypeScript, incluindo o tsconfig.json
COPY tsconfig.json ./

# Copie os arquivos fontes (pasta src)
COPY src ./src

# Copie o arquivo .env, se necessário
COPY .env ./

# Exponha a porta da aplicação (ajuste para sua aplicação)
EXPOSE 3001

# Rodar o código TypeScript diretamente
CMD ["npx", "ts-node", "index.ts"]