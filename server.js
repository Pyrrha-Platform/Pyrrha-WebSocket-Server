const WebSocket = require('ws');
const winston = require('winston');

const logConfiguration = {
  transports: [new winston.transports.Console()],
};

function noop() {}

function heartbeat() {
  this.isAlive = true;
}

const logger = new winston.createLogger(logConfiguration);
const PORT = process.env.PORT || 8090;

const wss = new WebSocket.Server({ port: PORT });

logger.info(`Started websocket server on port: ${PORT}`);

wss.on('connection', function connection(ws, req) {
  const ip = req.socket.remoteAddress;
  logger.info(`new client connected: ${ip}`);
  // set up alive check to terminate if client does not pong back
  ws.isAlive = true;
  ws.on('pong', heartbeat);

  ws.on('message', function incoming(data) {
    logger.info(`logger, incoming data: ${data}`);

    // Broadcast to everyone else.
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        logger.info(
          `logger, Broadcasting message to ${wss.clients.size - 1} clients`
        );
        client.send(data);
      }
    });
  });

  ws.on('close', function (code, reason) {
    console.log('connection closed by remote');
    console.log(`this._socket.remoteAddress: ${this._socket.remoteAddress}`);
    console.log(`code: ${code}`);
    console.log(`reason: ${reason}`);
  });
});

const interval = setInterval(function ping() {
  wss.clients.forEach(function each(ws) {
    logger.info(`checking if client is still alive`);
    logger.info(JSON.stringify(ws._socket.address()));
    if (ws.isAlive === false) {
      logger.info('logger, connection no longer alive, terminating');
      return ws.terminate();
    }
    ws.isAlive = false;
    ws.ping(noop);
    logger.info('client is still alive.');
  });
}, 30000);

wss.on('close', function close() {
  logger.info(`connection closed`);
  clearInterval(interval);
});
