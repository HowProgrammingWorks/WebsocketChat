'use strict';

global.api = {};
api.fs = require('fs');
api.http = require('http');
api.websocket = require('websocket');

let index = api.fs.readFileSync('./index.html');

let server = api.http.createServer((req, res) => {
  res.writeHead(200);
  res.end(index);
});

server.listen(80, () => {
  console.log('Listen port 80');
});

let ws = new api.websocket.server({
  httpServer: server,
  autoAcceptConnections: false
});

let clients = [];

ws.on('request', (req) => {
  let connection = req.accept('', req.origin);
  clients.push(connection);
  console.log('Connected ' + connection.remoteAddress);
  connection.on('message', (message) => {
    let dataName = message.type + 'Data',
        data = message[dataName];
    console.dir(message);
    console.log('Received: ' + data);
    clients.forEach((client) => {
      if (connection !== client) {
        client.send(data);
      }
    });
  });
  connection.on('close', (reasonCode, description) => {
    console.log('Disconnected ' + connection.remoteAddress);
  });
});
