FROM node:latest


# Create app directory
WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npx nx run client:build:production
RUN npx nx run server:build:production
                                                  
EXPOSE 3000

CMD npx nx run server:serve:production
