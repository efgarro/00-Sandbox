import { Buffer } from "buffer";

const memContainer = Buffer.alloc(3);

memContainer[0] = 0x48;
memContainer[1] = 0x69;
memContainer[2] = 0x21;

console.log(memContainer.toString("utf-8"));
