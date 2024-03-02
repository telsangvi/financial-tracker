FROM node:18-alpine
WORKDIR /usr/financial-tracker

COPY package.json ./
RUN npm install && npm cache clean --force
ENV PATH=/usr/financial-tracker/node_modules/.bin:$PATH

WORKDIR /usr/financial-tracker
COPY tsconfig.json ./

COPY src ./src
COPY .env ./

EXPOSE ${PORT}

CMD ["npm", "run", "start"]
