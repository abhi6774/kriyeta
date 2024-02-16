import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const host = process.env.HOST ?? "localhost";
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.json());

app.get("/", (req, res) => {
    res.send({ message: "Hello API" });
});

server.listen(port, host, () => {
    console.log(`[ ready ] http://${host}:${port}`);
});
