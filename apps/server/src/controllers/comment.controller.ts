import apiResponse from "../utils/apiResponse";
import apiError from "../utils/apiError";
import Like from "../models/like.models";
import asyncHandler from "../utils/asyncHandler";
import { NextFunction, Response, Request } from "express";
import Comment from "../models/comment.models";
import mongoose from "mongoose";

export const addComment = asyncHandler(
    async (req: Request & { user: any }, res: Response, next: NextFunction) => {
        const { content } = req.body;
        const { postId } = req.params;

        if (!content) {
            throw new apiError(400, "comment is required");
        }

        const comment = await Comment.create({
            content,
            post: postId,
            commentBy: req.user._id,
        });

        res.status(200).json(
            new apiResponse(comment, "your comment is Upload successfully.")
        );
    }
);

export const deletecomment = asyncHandler(
    async (req: Request & { user: any }, res: Response, next: NextFunction) => {
        const { commentId } = req.params;

        if (!commentId) {
            throw new apiError(400, "comment is required");
        }

        const comment = await Comment.findByIdAndDelete(commentId);

        res.status(200).json(
            new apiResponse(comment, "your comment is deleted successfully.")
        );
    }
);

export const getCommentByPost = asyncHandler(
    async (req: Request , res: Response, next: NextFunction) => {
        const { postId } = req.params;

        if (!postId) {
            throw new apiError(400, "post id is required !");
        }

        const comments = await Comment.aggregate([
            {
                $match: {
                    post: new mongoose.Types.ObjectId(postId),
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "commentBy",
                    foreignField: "_id",
                    as: "user",
                },
            },
            {
                $addFields: {
                    avatar: {
                        $first: "$user",
                    },
                    // user: "$user.avatar",
                    // userName: "$user.userName",
                },
            },
            {
                $addFields: {
                   
                    // user: "$user.avatar",
                    userName: "$user.userName",
                },
            },
        ]);

        res.status(200).json(new apiResponse(comments, "all comments"));
    }
);
