FROM node:18

WORKDIR /app

COPY package*.json ./

COPY ./src ./src

RUN npm install

EXPOSE 3001

CMD [ "npm", "run", "start"]