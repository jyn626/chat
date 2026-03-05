FROM node:22-alpine

# set working directory
WORKDIR /app

# Copy dependencies
COPY package.json yarn.lock ./

RUN yarn install

COPY . . 

EXPOSE 3000

CMD ["yarn", "dev"]
