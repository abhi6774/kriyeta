import { Router } from "express";
import {
    addVersion,
    getVersion,
    getVersionById,
} from "../controllers/version.controller";
import auth from "../middlewares/auth.middlewares";
const router = Router();

router.route("/:versionId").get(getVersionById);

router.route("/:postId").get(getVersion).post(auth, addVersion);
export default router;
