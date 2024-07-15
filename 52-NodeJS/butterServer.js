import Butter from "./butter.js";

const PORT = 4052;

const server = new Butter();

server.route("get", "/", (req, res) => {
  res.sendFile("./public/main.html", "text/html");
});

server.route("get", "/styles.css", (req, res) => {
  res.sendFile("./public/styles.css", "text/css");
});

server.route("get", "/script.js", (req, res) => {
  res.sendFile("./public/script.js", "text/javascript");
});

server.route("post", "/login", (req, res) => {
  res.status(400).json({ message: "Unatherized User" });
});

server.listen(PORT, () => {
  console.log(`Butter server listening on port ${PORT}`);
});
