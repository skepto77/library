FROM node:16.13-alpine3.14

WORKDIR /counter

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]