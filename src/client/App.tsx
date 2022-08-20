import React, { useState, useEffect } from "react";
import "./App.css";
import { initSocket, sendMessage, ws } from "./client-socket";
import Layout from "./components/Layout";

function App() {
  const [receivedMsg, setReceivedMsg] = useState("");

  useEffect(() => {
    initSocket();
    ws.onmessage = (msg) => {
      const { event } = JSON.parse(msg.data);
      switch (event) {
        case "pong":
          setReceivedMsg("pong");
          break;
        case "pongAll":
          setReceivedMsg("pongAll");
          break;
        default:
          break;
      }
    };
  }, []);

  const sendPing = () => {
    sendMessage({
      event: "ping",
    });
  };

  const sendPingAll = () => {
    sendMessage({
      event: "pingAll",
    });
  };

  return (
    <>
      <Layout flexDirection="column" paddingTop={4}>
        <Layout>
          <button onClick={sendPing}>Ping</button>
          <button onClick={sendPingAll}>PingAll</button>
        </Layout>
        <Layout>{receivedMsg}</Layout>
      </Layout>
    </>
  );
}

export default App;
