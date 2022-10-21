FROM node:18

ENV PORT=3000

WORKDIR /var/www

COPY ./build .

COPY ./public ./public

COPY ./views ./views 

COPY package.json .

RUN npm i --omit=dev --ignore-scripts

EXPOSE $PORT

CMD npm run start-docker


