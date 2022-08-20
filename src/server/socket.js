const WebSocket = require("ws");
const { v4: uuidv4 } = require("uuid");

let wss;
let clients = {};

function sendMsg(target, msg) {
  clients[target]?.send(JSON.stringify(msg));
}

function sendToAll(msg, except = []) {
  Object.values(clients)
    .filter((client) => client && !except.includes(client.uuid))
    .forEach((client) => {
      client.send(JSON.stringify(msg));
    });
}

let currentState;

function handleMessage(client, payload) {
  console.log(client.uuid, payload);
  if (!clients[client.uuid]) {
    return;
  }
  switch (payload.event) {
    case "ping":
      sendMsg(client.uuid, {
        event: "pong",
        info: payload.info,
      });
      break;
    case "pingAll":
      sendToAll({
        event: "pongAll",
        info: payload.info,
      });
      break;
    default:
      break;
  }
}

function initWs(server) {
  wss = new WebSocket.Server({ server });
  wss.on("connection", (client) => {
    client.uuid = uuidv4();
    clients[client.uuid] = client;
    client.send(
      JSON.stringify({
        event: "connection",
        info: client.uuid,
      })
    );
    console.log(Object.keys(clients));

    client.on("message", (payload) => {
      handleMessage(client, JSON.parse(payload));
    });
    client.on("close", () => {
      delete clients[client.uuid];
    });

    if (currentState) {
      sendMsg(client.uuid, {
        event: "serverChangedContext",
        info: { context: currentState?.context },
      });
      sendMsg(client.uuid, { event: "serverUpdateState", info: currentState });
    }
  });
  return wss;
}

module.exports = {
  initWs,
};
