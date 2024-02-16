import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/auth.controller";
import upload from "../middlewares/multer.middlewares";

const authRouter = Router();

authRouter.route("/register").post(upload.single("avatar"), registerUser);
authRouter.route("/login").post(loginUser)
authRouter.route("/logout").post(logoutUser)

export default authRouter;
