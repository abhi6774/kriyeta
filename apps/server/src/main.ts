import app from "./app";
import { createServer } from "http";
import { Server } from "socket.io";

const host = process.env.HOST ?? "localhost";
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const server = createServer(app);
const io = new Server(server);
import connectDb from "./db/connectDB";

app.get("/", (req, res) => {
    res.send({ message: "Hello API" });
});

connectDb()
    .then(() => {
        server.listen(port, host, () => {
            console.log(`[ ready ] http://${host}:${port}`);
        });
    })
    .catch((error) => console.log("mongo db connection FAILED : ", error));
