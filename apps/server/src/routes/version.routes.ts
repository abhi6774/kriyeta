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

router.route("/editpost/:postId").post((req, res, next) => {
    console.log("Editing Post", req.params.postId)
    next()
}, auth, addVersion);
export default router;
