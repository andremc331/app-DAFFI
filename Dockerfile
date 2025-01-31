# Usar a imagem base do Node.js versão 20, igual ao do Amplify
FROM node:20

# Criar e definir o diretório de trabalho
WORKDIR /app

# Copiar o arquivo package.json e package-lock.json (para instalar as dependências)
COPY package*.json ./

# Instalar a versão mais recente do npm (como no Amplify)
RUN npm install -g npm@latest

# Instalar as dependências do projeto
RUN npm install

# Copiar o restante dos arquivos do projeto
COPY . .

# Criar um diretório de build específico (como no Amplify) para armazenar a build
RUN npm run build --omit=dev

# Expor a porta onde a aplicação estará rodando
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]

# Cache para os módulos do Node.js (como no Amplify)
VOLUME /app/node_modules/.cache