FROM node:carbon

WORKDIR /app
COPY . .

RUN apt-get update
RUN apt-get install vim -y
RUN npm install -g nodemon 


CMD ["/bin/bash", "run.sh"]