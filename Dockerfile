FROM node:16
WORKDIR /usr/src/mywebapp
COPY package*.json ./

RUN npm install 
RUN npm install express
RUN npm install pg
RUN npm install morgan

COPY . .

RUN npm run build
EXPOSE 8000
CMD ["node", "app.js"]