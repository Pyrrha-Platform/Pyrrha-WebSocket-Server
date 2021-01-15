const WebSocket = require('ws');
const winston = require('winston')

const logConfiguration = {
  'transports': [
    new winston.transports.Console()
  ]
};

const logger = new winston.createLogger(logConfiguration)
const PORT = process.env.PORT || 8090;

const wss = new WebSocket.Server({ port: PORT });

logger.info(`Started websocket server on port: ${PORT}`)

// Broadcast to all.
// wss.broadcast = function broadcast(data) {
//   wss.clients.forEach(function each(client) {
//     if (client.readyState === WebSocket.OPEN) {
//       client.send(data);
//     }
//   });
// };

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    logger.info(`logger, incoming data: ${data}`);
    logger.info(`logger, Broadcasting message to ${wss.clients.size - 1} clients`);
    console.log(`incoming data: ${data}`);
    console.log(`Broadcasting message to ${wss.clients.size - 1} clients`);
    // Broadcast to everyone else.
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});
