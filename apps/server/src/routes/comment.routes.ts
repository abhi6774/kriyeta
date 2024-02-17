import { Router } from "express";
import auth from "../middlewares/auth.middlewares";
// import { likeToggle } from "../controllers/like.controller";
import {
    addComment,
    deletecomment,
    getCommentByPost,
} from "../controllers/comment.controller";

const router = Router();

router.route("/:postId").post(auth, addComment).get(getCommentByPost);

router.route("/:commentId").delete(auth, deletecomment);

export default router;
