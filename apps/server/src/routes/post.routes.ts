import { Router } from "express";
import { addPost, deletePost, getAllPost } from "../controllers/post.controller";
import auth from "../middlewares/auth.middlewares";

const router = Router();

router.route("/").get(getAllPost).post(auth ,addPost);
router.route("/:postId").delete(deletePost)

export default router