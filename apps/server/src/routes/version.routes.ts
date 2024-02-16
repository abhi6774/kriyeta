import { Router } from "express"
import { addVersion, getVersion } from "../controllers/version.controller";
import auth from "../middlewares/auth.middlewares";
const router = Router();


router.route("/:postId").get(getVersion).post(auth ,addVersion)
export default router;