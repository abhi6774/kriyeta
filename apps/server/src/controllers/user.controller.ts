import apiResponse from "../utils/apiResponse";
import apiError from "../utils/apiError";
import Like from "../models/like.models";
import asyncHandler from "../utils/asyncHandler";
import { NextFunction, Response, Request } from "express";
import Comment from "../models/comment.models";
import mongoose from "mongoose";
import Version from "../models/version.models";
import User from "../models/user.models";
import Follow from "../models/follow.models";

export const getUserProfile = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { userName } = req.params;

        const user = await User.aggregate([
            {
                $match: { userName: userName },
            },
            {
                $lookup: {
                    from: "follows",
                    localField: "_id",
                    foreignField: "user",
                    as: "follower",
                },
            },
            {
                $addFields: {
                    follower: {
                        $size: "$follower",
                    },
                },
            },
            {
                $lookup: {
                    from: "follows",
                    localField: "_id",
                    foreignField: "follower",
                    as: "following",
                },
            },
            {
                $addFields: {
                    following: {
                        $size: "$following",
                    },
                },
            },
        ]);

        res.status(200).json(
            new apiResponse(user[0],'User Profile')
        )
    }
);
