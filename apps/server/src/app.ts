import errorMiddleware from "./middlewares/error.middlewares";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(express.static("apps/server/public/"));
//cors setup

// import Routers
import authRouter from "./routes/auth.routes";
import postRouter from "./routes/post.routes";
import likeRouter from "./routes/like.routes";
import commentRouter from "./routes/comment.routes";
import versionRouter from "./routes/version.routes";
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/like", likeRouter);
app.use("/api/v1/comment", commentRouter)
app.use("/api/v1/version",versionRouter);

export default app;

app.use(errorMiddleware);
