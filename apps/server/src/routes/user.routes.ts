import { Router } from "express";
import { getUserProfile } from "../controllers/user.controller";

const router = Router();

router.route("/profile/:userName").get(getUserProfile)
export default router