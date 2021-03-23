FROM node:15-alpine

# Creating app directory
WORKDIR /weatherapp-backend

# Installing app dependencies
COPY . /weatherapp-backend
RUN npm install

# Binding backend port
EXPOSE 9000

CMD ["npm", "start"]