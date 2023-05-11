FROM node

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

USER node

CMD [ "npm", "start" ]



