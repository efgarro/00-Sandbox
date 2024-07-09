import net from "node:net";

const socket = net.createConnection({ host: "localhost", port: 8050 }, () => {
  socket.write("All work and no play is fun");
});

socket.on("data", (chunk) => {
  console.log("Received Response");
  console.log(chunk.toString("utf8"));
  socket.end()
});
