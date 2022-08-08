FROM node:latest

# create work directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# copy package.json
COPY package.json /usr/src/app
RUN npm install

EXPOSE 50051
# copy source code
COPY . /usr/src/app
CMD ["npm", "start"]