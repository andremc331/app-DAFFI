FROM node:16

# Definir o diretório de trabalho
WORKDIR /app

# Copiar arquivos do package.json e instalar dependências
COPY ./package.*json ./package-lock*.json ./

# Copiar o restante dos arquivos do projeto
COPY . .

# Instalar as dependências
RUN npm install

# Instalar o ts-node globalmente
RUN npm install ts-node --save-dev

# Rodar o código TypeScript diretamente usando ts-node
CMD ["npx", "ts-node", "index.ts"]