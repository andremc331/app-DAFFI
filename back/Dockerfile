# Use a imagem base do Node.js
FROM node:16

# Crie e defina o diretório de trabalho no container
WORKDIR /app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Compile o código TypeScript
RUN npm run build

# Exponha a porta da aplicação (ajuste para sua aplicação)
EXPOSE 3001

# Comando para rodar a aplicação
CMD ["npm", "start"]