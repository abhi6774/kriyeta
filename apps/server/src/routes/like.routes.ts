import { Router } from "express";
import auth from "../middlewares/auth.middlewares";
import { likeToggle } from "../controllers/like.controller";

const router = Router();

router.route("/:postId").post(auth, likeToggle)

export default router;