import apiResponse from "../utils/apiResponse";
import apiError from "../utils/apiError";
import Like from "../models/like.models";
import asyncHandler from "../utils/asyncHandler";
import { NextFunction, Response, Request } from "express";
import Comment from "../models/comment.models";
import mongoose from "mongoose";
import Version from "../models/version.models";

export const getVersion = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { postId } = req.params;

        if (!postId) {
            return next(new apiError(400, "Post id is requried !"));
        }

        const versions = await Version.find();

        res.status(200).json(
            new apiResponse(versions, "All version of the Post")
        );
    }
);

export const addVersion = asyncHandler(
    async (req: Request & { user: any }, res: Response, next: NextFunction) => {
        const { postId } = req.params;
        const { content } = req.body;

        if (!postId) {
            return next(new apiError(400, "Post id is requried !"));
        }

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
