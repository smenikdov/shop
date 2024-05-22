FROM node:latest

# RUN apt-get update && \
#     apt install
WORKDIR /code

COPY . .

RUN npm i

EXPOSE 3000
