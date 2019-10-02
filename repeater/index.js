const express = require('express');
const http = require('http');
const DB = require('../db')();
const app = express();

app.get('/', function (req, res) {
    const id = req.query.id;
    DB.find(id).then(rows => {
        const row = rows[0];
        const port = row.url.split(':').length === 3 ? +row.url.split(':')[1] : 80;
        const options = {
            method: row.method,
            path: row.url,
            host: JSON.parse(row.headers).host,
            port,
            headers: JSON.parse(row.headers),
            agent: new http.Agent({ keepAlive: this.keepAlive })
        }; 
        const request = http.request(options);
        request.end(row.body);

        request.on('response', (serverResponse) => {
            res.writeHead(serverResponse.statusCode, serverResponse.statusMessage, serverResponse.headers);
            serverResponse.on('data', (chunk) => {
                res.end(chunk);
            });
            serverResponse.on('close', () => {
                console.log('close');
            });
        });

        request.on('error', (error) => {
            console.log(error);
        });
    }).catch(err => console.error(err));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});