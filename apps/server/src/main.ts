import express from "express";
import { createServer } from "http";
// import { Server } from "socket.io";
import app from "./app";
import connectDb from "./db/connectDB";

const host = process.env.HOST ?? "localhost";
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const server = createServer(app);
// const io = new Server(server);

app.use(express.static("dist/apps/client"));


app.get("*", (req, res) => {
    res.sendFile("index.html", { root: "dist/apps/client" });
})

connectDb()
    .then(() => {
        server.listen(port, host, () => {
            console.log(`[ ready ] http://${host}:${port}`);
        });
    })
    .catch((error) => console.log("mongo db connection FAILED : ", error));
