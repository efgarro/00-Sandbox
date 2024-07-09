import fsPs from "node:fs/promises";

(async () => {
  const CREATE_FILE = "create file";

  const fileHandle = await fsPs.open("./command.txt", "r");

  fileHandle.on("change", async () => {
    console.log("change emitted");
    const { size } = await fileHandle.stat();
    const buff = Buffer.alloc(size);
    const offset = 0;
    const length = size;
    const position = 0;
    await fileHandle.read(buff, offset, length, position);
    const command = buff.toString("utf-8");
    console.log(command);
    if (command.includes(CREATE_FILE)) {
      const path = command.substring(CREATE_FILE.length + 1);
      createFile(path);
    }
  });

  const createFile = (path) => {
    fsPs.appendFile(path, Buffer.alloc(0));
    console.log(path);
  };

  const watcher = fsPs.watch("./command.txt");

  for await (const event of watcher) {
    if (event.eventType === "change") {
      console.log(event);
      fileHandle.emit("change");
    }
  }

  // commands
})();
