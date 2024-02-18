import { Router } from "express";
import {
    addPost,
    deletePost,
    getAllPost,
    getPostById,
    getPostByUser,
} from "../controllers/post.controller";
import auth from "../middlewares/auth.middlewares";
// import upload from "../middlewares/multer.middlewares";

const router = Router();

router.route("/").get(getAllPost).post(auth, addPost);
router.route("/:postId").get(getPostById).delete(auth, deletePost);
router.route("/user/:userId").get(getPostByUser);

export default router;
