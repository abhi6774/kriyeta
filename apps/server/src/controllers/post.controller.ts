import { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import ApiError from "../utils/apiError";
// import User from "../models/user.models";
import apiResponse from "../utils/apiResponse";
// import { deleteOnCloundinary, uploadOnCloudinary } from "../utils/cloudinary";
import Post from "../models/post.models";
import mongoose from "mongoose";

export const getAllPost = asyncHandler(async (req: Request, res: Response) => {
    const posts = await Post.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "userName",
            },
        },
        {
            $lookup: {
                from: "likes",
                localField: "_id",
                foreignField: "post",
                as: "totalLikes",
            },
        },
        {
            $addFields: {
                totalLikes: {
                    $size: "$totalLikes",
                },
            },
        },
        {
            $lookup: {
                from: "comments",
                localField: "_id",
                foreignField: "post",
                as: "totalComment",
            },
        },
        {
            $addFields: {
                totalComment: {
                    $size: "$totalComment",
                },
            },
        },
        {
            $addFields: {
                userName: {
                    $first: "$avatar",
                },
            },
        },
        {
            $addFields: {
                // avatar: "$avatar.avatar",
                userName: "$userName.userName",
            },
        },
    ]);

    res.status(200).json(new apiResponse(posts, "All Posts"));
});

export const addPost = asyncHandler(
    async (req: Request & { user: any }, res: Response, next: NextFunction) => {
        const { content, title } = req.body;

        const userId = req?.user?._id;

        if (!content || !title) {
            return next(new ApiError(400, "title or content is required !"));
        }

        // const imageLocalPath = req?.file?.path;

        // const img = await uploadOnCloudinary(imageLocalPath);

        const post = await Post.create({
            title,
            content,
            owner: userId,
            // image: {
            //     url: img ? img.url : undefined,
            //     public_id: img ? img.public_id : undefined,
            // },
        });

        res.status(200).json(new apiResponse(post, "All Posts"));
    }
);

export const deletePost = asyncHandler(
    async (req: Request & { user: any }, res: Response, next: NextFunction) => {
        const { postId } = req.params;

        const post = await Post.findByIdAndDelete(postId);

        if (!post) {
            return next(new ApiError(400, "Post is not found !"));
        }

        // await deleteOnCloundinary(post?.image?.public_id);

        res.status(200).json(
            new apiResponse(post, "Posts deleted successfully .")
        );
    }
);

export const getPostById = asyncHandler(
    async (req: Request & { user: any }, res: Response, next: NextFunction) => {
        const { postId } = req.params;

        if (!postId) {
            return next(new ApiError(400, "Post is not found !"));
        }

        const post = await Post.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(postId),
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "owner",
                    foreignField: "_id",
                    as: "userName",
                },
            },
            {
                $lookup: {
                    from: "likes",
                    localField: "_id",
                    foreignField: "post",
                    as: "totalLikes",
                },
            },
            {
                $addFields: {
                    totalLikes: {
                        $size: "$totalLikes",
                    },
                },
            },
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "post",
                    as: "totalComment",
                },
            },
            {
                $addFields: {
                    totalComment: {
                        $size: "$totalComment",
                    },
                },
            },
            {
                $addFields: {
                    userName: {
                        $first: "$avatar",
                    },
                },
            },
            {
                $addFields: {
                    // avatar: "$avatar.avatar",
                    userName: "$userName.userName",
                },
            },
        ]);

        res.status(200).json(new apiResponse(post[0], "Posts"));
    }
);
