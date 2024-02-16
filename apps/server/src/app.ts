import errorMiddleware from "./middlewares/error.middlewares";
import express from "express";

const app = express();


app.use(express.json());

// import Routers
import authRouter from "./routes/auth.routes"

app.use("/api/v1/auth",authRouter)


export default  app