const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const socket = require("./socket");
const path = require("path");
dotenv.config();

const PORT = process.env.PORT || 5000;
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.BASE_URL_PROD
    : process.env.BASE_URL_DEV;

const app = express();

app.use(express.static(path.join(__dirname, "..", "..", "build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../build/index.html"));
});

const server = http.Server(app);

socket.initWs(server);

server.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
