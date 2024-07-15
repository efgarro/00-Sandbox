import http from "node:http";
import fsP from "node:fs/promises";

const webServer = http.createServer();

const PORT = 8060;

webServer.on("request", async (req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.setHeader("Content-Type", "text/html");

    const fileHandle = await fsP.open("./public/main.html", "r");
    const fileStream = fileHandle.createReadStream();

    fileStream.pipe(res);
  }
  if (req.method === "GET" && req.url === "/styles.css") {
    res.setHeader("Content-Type", "text/css");

    const fileHandle = await fsP.open("./public/styles.css", "r");
    const fileStream = fileHandle.createReadStream();

    fileStream.pipe(res);
  }
  if (req.method === "GET" && req.url === "/script.js") {
    res.setHeader("Content-Type", "text/javascript");

    const fileHandle = await fsP.open("./public/script.js", "r");
    const fileStream = fileHandle.createReadStream();

    fileStream.pipe(res);
  }
  if (req.method === "POST" && req.url === "/upload") {
    res.setHeader("Content-Type", "text/javascript");

    const fileHandle = await fsP.open("./public/script.js", "r");
    const fileStream = fileHandle.createReadStream();

    fileStream.pipe(res);
  }

  console.log(req.method);
  console.log(req.url);
});

console.log(webServer);

webServer.listen(PORT, () => {
  console.log(`Web Server listening on port ${PORT}`);
});
