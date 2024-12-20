# Etapa 1: Construção do front-end (React)
FROM node:18 as frontend-build

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos do package.json e package-lock.json do front-end
COPY front/package*.json ./ 

# Instalar as dependências do front-end
RUN npm install

# Copiar o restante dos arquivos do front-end
COPY front/ ./ 

RUN chmod +x ./node_modules/.bin/react-scripts

# Construir o projeto React
RUN npm run build

# Etapa 2: Construção do back-end (Express)
FROM node:18 as backend-build

# Definir o diretório de trabalho para o back-end
WORKDIR /app/back

# Copiar os arquivos do package.json e package-lock.json do back-end
COPY back/package*.json ./ 

# Instalar as dependências do back-end
RUN npm install

# Copiar o restante dos arquivos do back-end
COPY back/ ./ 

# Garantir que o tsc tenha permissões de execução
RUN chmod +x ./node_modules/.bin/tsc

# Compilar o código TypeScript para JavaScript
RUN npm run build   # Isso usa o script "build" para rodar "tsc"

# Etapa 3: Imagem final
FROM node:18

# Definir o diretório de trabalho
WORKDIR /app

# Copiar o código compilado do front-end e back-end
COPY --from=frontend-build /app/build /app/build
COPY --from=backend-build /app/dist /app/dist

# Expor a porta que o back-end vai rodar
EXPOSE 3001

WORKDIR /app/back  # Mudar para o diretório correto do back-end
# Definir o comando para rodar o servidor back-end
CMD ["npm", "start"]
