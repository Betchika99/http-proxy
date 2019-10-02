FROM ubuntu:18.04

EXPOSE 8081
EXPOSE 3000

RUN apt-get update
RUN apt-get install -y curl gnupg2 --fix-missing
RUN apt-get update
RUN curl -sL https://deb.nodesource.com/setup_11.x | bash
RUN apt-get install -y nodejs

COPY . .

WORKDIR .
RUN npm install
RUN cd repeater && npm install

CMD node index.js & node repeater/index.js