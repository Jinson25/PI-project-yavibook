FROM node:20

WORKDIR /app

COPY ./pacage*.json ./

RUN npm install

COPY . .

CMD [ "npm", "run", "dev" ]