'use strict';
const http = require('http');
const net = require('net');
const url = require('url');
const EVENTS = require('./config').EVENTS;
const PROXY_SERVER_OPTIONS = require('./config').PROXY_SERVER_OPTIONS;
const DB = require('./db')();

class ProxyServer {
    constructor() {
        this.serverInstance = null;
        this.create();
    }

    create() {
        this.serverInstance = http.createServer();

        // this.serverInstance.on(EVENTS.CONNECT, this.proxing);
        this.serverInstance.on(EVENTS.REQUEST, this.onRequest);
        this.serverInstance.listen(PROXY_SERVER_OPTIONS, this.onListen);
        console.log('ProxyServer created!');
    }

    onRequest(clientRequest, proxyResponse) {
        const port = clientRequest.url.split(':').length === 2 ? +clientRequest.url.split(':')[1] : 80;
        const options = {
            method: clientRequest.method,
            path: clientRequest.url,
            host: clientRequest.headers.host,
            port,
            //TODO: переименовать хедеры под прокси
            headers: clientRequest.headers,
            agent: new http.Agent({ keepAlive: this.keepAlive })
        }; 
        
        const body = ''
        clientRequest.on('data', (chunk) => {
            body += chunk;
        });

        DB.create(options.method, options.path, options.headers, body, 'requests');

        const request = http.request(options);
        request.end();

        request.on('response', (serverResponse) => {
            console.log('serverResponse');
            proxyResponse.writeHead(serverResponse.statusCode, serverResponse.statusMessage, serverResponse.headers);
            serverResponse.on('data', (chunk) => {
                proxyResponse.end(chunk);
            });
            serverResponse.on('close', () => {
                console.log('close');
            });
        });

        request.on('error', (error) => {
            console.log(error);
        });
    }

    onListen() {
        console.log(`ProxyServer is listening on ${PROXY_SERVER_OPTIONS.host}:${PROXY_SERVER_OPTIONS.port}`);
    }


    proxing(request, clientSocket, head) {
        console.log('Begin proxing...');
        console.log('HEAD: ', head);
        const path = url.parse(request.url);
        const serverSocket = net.connect(path.port, path.host, onServerConnect);

        serverSocket.on(EVENTS.FINISH, () => clientSocket.destroy());
        clientSocket.on(EVENTS.CLOSE, () => serverSocket.end());

        const onServerConnect = () => {
            //TODO: писать новые заголовки клиенту
            // clientSocket.write();
            serverSocket.write(head);
            //TODO: сохранять запрос
            serverSocket.pipe(clientSocket);
            clientSocket.pipe(serverSocket);
        }
    }
}

module.exports = () => new ProxyServer();
