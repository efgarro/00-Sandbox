import http from "node:http";
const PORT = 8050;

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("------METHOD------");
  console.log(req.method);
  console.log("------URL------");
  console.log(req.url);
  console.log("------HEADERS------");
  console.log(req.headers);
  console.log("------BODY------");
  req.on("data", (chunk) => {
    console.log(chunk);
  });
});

server.listen(PORT, "localhost", () => {
  console.log(`Server listening on port ${PORT}`);
});
