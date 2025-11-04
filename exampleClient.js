#!/usr/bin/env node
const WebSocketClient = require('websocket').client;

const client = new WebSocketClient();

client.on('connectFailed', function (error) {
  console.log('Connect Error: ' + error.toString());
});

client.on('connect', function (connection) {
  console.log('WebSocket Client Connected');
  connection.on('error', function (error) {
    console.log('Connection Error: ' + error.toString());
  });
  connection.on('close', function () {
    console.log('echo-protocol Connection Closed');
  });
  connection.on('message', function (message) {
    if (message.type === 'utf8') {
      console.log("Received: '" + message.utf8Data + "'");
    }
  });

  function _sendNumber() {
    if (connection.connected) {
      const number = Math.round(Math.random() * 0xffffff);
      console.log(`sending number: ${number}`);
      connection.sendUTF(number.toString());
      setTimeout(_sendNumber, 1000);
    }
  }
  // sendNumber();
});

// client.connect('ws://159.122.217.91/ws', 'echo-protocol');
client.connect('ws://localhost:8080', 'echo-protocol');
