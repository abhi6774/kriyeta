import { Router } from "express";
import {
    addVersion,
    getVersions,
    getVersionById,
} from "../controllers/version.controller";
import auth from "../middlewares/auth.middlewares";
const router = Router();

router.route("/post/:postId").get(getVersions);
router.route("/:versionId").get(getVersionById);

router.route("/editpost/:postId").post(auth, addVersion);
export default router;
