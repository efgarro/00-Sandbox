import * as http from "node:http";
import fsP from "node:fs/promises";
import { error } from "node:console";

export default class Butter {
  constructor() {
    this.server = http.createServer();
    this.routes = {};
    this.server.on("request", (req, res) => {
      const methodPath = req.method.toLowerCase() + req.url;

      res.sendFile = async (path, mime) => {
        const fileHandle = await fsP.open(path, "r");
        const fileStream = fileHandle.createReadStream();

        res.setHeader("Content-Type", mime);
        fileStream.pipe(res);
      };

      res.status = (code) => {
        res.statusCode = code;
        return res;
      };

      res.json = (data) => {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(data));
      };

      if (!this.routes[methodPath]) {
        return res
          .status(404)
          .json({ error: `Can not ${req.method} in ${req.url}` });
      }
      this.routes[methodPath](req, res);
    });
  }

  route(method, path, cb) {
    this.routes[method + path] = cb;
  }

  listen(port, cb) {
    this.server.listen(port, () => {
      cb();
    });
  }
}
