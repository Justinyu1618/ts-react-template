// const port = process.env.PORT || 5000;
// const host =
//   process.env.NODE_ENV === "production"
//     ? process.env.WS_URL_PROD
//     : process.env.WS_URL_DEV;
const host = location.origin.replace(/^http/, "ws").replace("3000", "5000"); //hack

export let ws = new WebSocket(host);

export const initSocket = () => {
  ws = new WebSocket(host);
};

export const sendMessage = (m: any) => {
  try {
    ws.send(JSON.stringify(m));
  } catch (err) {
    console.log("WS error: ", err);
  }
};

ws.onopen = (e) => {
  console.log("open socket");
};

ws.onerror = (e) => {
  console.log("Socket error! ", e);
};
ws.onclose = (e) => {
  console.log("socket closed! restarting");
  initSocket();
};
