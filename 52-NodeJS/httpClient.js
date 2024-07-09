import http, { Agent } from "node:http";
import { hostname } from "node:os";

const agent = new http.Agent({ keepAlive: true });

const req = http.request({
  agent: agent,
  hostname: "localhost",
  port: 8050,
  method: "POST",
  path: "/upload",
  headers: { "Content-Type": "application/json" },
});

req.on("response", (res) => {});

req.write(JSON.stringify({ message: "Hi there" }));
req.write(JSON.stringify({ message: "your name?" }));
req.write(JSON.stringify({ message: "Nice to meet you" }));
req.end(JSON.stringify({ message: "The End" }));
