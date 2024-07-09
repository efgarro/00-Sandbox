// const net = require("node:net");
import net from "node:net";

const tcpServer = net.createServer((socket) => {
  socket.on("data", (data) => {
    console.log(data.toString());
  });
});

tcpServer.listen(3099, "127.0.0.1", () => {
  console.log(`TCP Server Listening on`, tcpServer.address());
});
