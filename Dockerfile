# Usar a imagem base oficial do Node.js
FROM node:18

# Definir o diretório de trabalho dentro do container
WORKDIR /back

# Copiar os arquivos de dependências (package.json e package-lock.json)
COPY back/package*.json ./

# Instalar as dependências da aplicação
RUN npm install

# Compilar o código TypeScript
RUN npm run build

# Expor a porta que o backend está configurado para ouvir
EXPOSE 3001

# Comando para iniciar a aplicação
CMD ["npm", "start"]