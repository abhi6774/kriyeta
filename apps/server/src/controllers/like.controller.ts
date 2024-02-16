import apiResponse from "../utils/apiResponse";
import Like from "../models/like.models";
import asyncHandler from "../utils/asyncHandler";
import { NextFunction, Response, Request } from "express";


export const likeToggle = asyncHandler(
    async (req: Request & { user: any }, res: Response, next: NextFunction) => {
        const { postId } = req.params;

        const checkIsLiked = await Like.findOne({ post: postId });
        
        if (!checkIsLiked) {

            await Like.create({
                post: postId,
                likedBy: req.user._id,
            });

            return res.status(200).json(new apiResponse({}, "liked"));

        } else {

            await Like.findByIdAndDelete(checkIsLiked._id);
            return res.status(200).json(new apiResponse({}, "unliked"));
        }
    }
);
