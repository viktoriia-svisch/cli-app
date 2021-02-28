FROM node:10.9.0-alpine
RUN npm install -g serve
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD [ "serve", "-s", "dist" ]
