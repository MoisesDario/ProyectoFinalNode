WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
EXPOSE 9006
CMD ["node","src"]