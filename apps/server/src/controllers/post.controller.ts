import { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import ApiError from "../utils/apiError";
import User from "../models/user.models";
import apiResponse from "../utils/apiResponse";
import { uploadOnCloudinary } from "../utils/cloudinary";
import Post from "../models/post.models";
import mongoose from "mongoose";

export const getAllPost = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const posts = await Post.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "owner",
                    foreignField: "_id",
                    as: "user",
                },
            },
            {
                $addFields: {
                    user: {
                        $first: "$user",
                    },
                    // user: "$user.avatar",
                    // userName: "$user.userName",
                },
            },
            {
                $addFields: {
                    user: "$user.avatar",
                    userName: "$user.userName",
                },
            },
        ]);

        res.status(200).json(
            new apiResponse(posts, "All Posts")
        )
    }
);


export const addPost = asyncHandler(
    async (req: Request & { user: any }, res: Response, next: NextFunction) => {
        const { content, title } = req.body;

        const userId = req.user._id;

        if (!content || !title) {
            return next(new ApiError(400, "title or content is required !"));
        }

        const post = await Post.create({
            title,
            content,
            onwer: userId,
        });

        res.status(200).json(new apiResponse(post, "All Posts"));
    }
);

export const deletePost = asyncHandler(
    async (req: Request & { user: any }, res: Response, next: NextFunction) => {
        const { postId } = req.params;

        const post = await Post.findByIdAndDelete(postId)

        if(!post){
            return next( new ApiError(400, "Post is not found !"))
        }

        res.status(200).json(new apiResponse(post, "Posts deleted successfully ."));

        
    }
);