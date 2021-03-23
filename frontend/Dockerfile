FROM node:15-alpine

# Creating app directory
WORKDIR /weatherapp

# Installing app dependencies
COPY . /weatherapp
RUN npm install

# Binding frontend port
EXPOSE 8000

CMD ["npm", "start"]