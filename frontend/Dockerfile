# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package*.json ./

RUN npm install --no-optional && npm cache clean --force

COPY . ./

EXPOSE 3000
CMD ["npm", "start"]