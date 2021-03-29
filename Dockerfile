FROM node:15-alpine AS front-build

COPY ./frontend ./frontend
WORKDIR /frontend
RUN npm install && npm run build


FROM node:15-alpine

RUN mkdir -p /usr/src/app/
COPY ./backend /usr/src/app/backend
WORKDIR /usr/src/app/backend
RUN npm install
COPY --from=front-build ./frontend/dist/ /usr/src/app/backend/build

EXPOSE 9000

CMD ["npm", "start"]