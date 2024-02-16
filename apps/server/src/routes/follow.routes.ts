import { Router } from "express";
import { followOrUnFollow } from "../controllers/follow.controller";
import auth from "../middlewares/auth.middlewares";

const router = Router();

router.route("/:userId").post(auth, followOrUnFollow)

export default router