FROM node:15-alpine

# Creating app directory
WORKDIR /weatherapp-frontend

# Installing app dependencies
COPY . /weatherapp-frontend
RUN npm install

# Binding frontend port
EXPOSE 8000

CMD ["npm", "start"]