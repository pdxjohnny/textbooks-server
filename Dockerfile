FROM node:wheezy

COPY . /usr/src/app

EXPOSE 8080

WORKDIR /usr/src/app
CMD ["node", "index.js"]
