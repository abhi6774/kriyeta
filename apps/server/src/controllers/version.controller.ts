import apiResponse from "../utils/apiResponse";
import apiError from "../utils/apiError";
import asyncHandler from "../utils/asyncHandler";
import { NextFunction, Response, Request } from "express";
import mongoose from "mongoose";
import Version from "../models/version.models";
import Post from "../models/post.models";

export const getVersions = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { postId } = req.params;
        // console.log(postId);

        if (!postId) {
            return next(new apiError(400, "Post id is requried !"));
        }

        const versions = await Version.aggregate([
            {
                $match: {
                    post: new mongoose.Types.ObjectId(postId),
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
                $addFields: {
                    userName: {
                        $first: "$userName.userName",
                    },
                },
            },
            {
                $project: {
                    content: 0,
                },
            },
        ]);

        // const version = await Version.findById("65cfcc624612693df2a9f633");

        // const version = await Version.find({})

        res.status(200).json(
            new apiResponse(versions, "All version of the Post")
        );
    }
);

export const getVersionById = asyncHandler(
    async (req: Request, res: Response) => {
        const { versionId } = req.params;

        const version = await Version.findById(versionId);

        res.status(200).json(new apiResponse(version, "version"));
    }
);

export const addVersion = asyncHandler(
    async (req: Request & { user: any }, res: Response, next: NextFunction) => {
        const { postId } = req.params;
        const { content } = req.body;

        if (!postId) {
            return next(new apiError(400, "Post id is requried !"));
        }

        const post = await Post.findById(postId);
        post.content = content;
        await post.save();

        const version = await Version.create({
            post: postId,
            owner: req.user._id,
            content,
        });

        res.status(200).json(
            new apiResponse(version, "your version is upload")
        );
    }
);

type UpdateVersionType = (id: string, content: string, title: string) => void;

type VersionType = {
    title: string;
    content: string;
    post: string;
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    save: () => {};
};
export const updateVersion: UpdateVersionType = async (id, content, title) => {
    const version: VersionType = await Version.findById(id);

    version.title = title ? title : version.title;
    version.content = content ? content : version.content;

    await version.save();
};
