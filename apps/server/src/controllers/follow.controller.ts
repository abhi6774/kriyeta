import { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import ApiError from "../utils/apiError";
import Follow from "../models/follow.models";
import apiResponse from "../utils/apiResponse";

export const followOrUnFollow = asyncHandler(
    async (req: Request & { user: any }, res: Response, next: NextFunction) => {
        // res.send(req.params);
        const { userId } = req.params;

        if (!userId) return next(new ApiError(400, "userId is required !"));

        const follow = await Follow.findOne({
            follower: userId,
            user: req?.user?._id,
        });

        if (!follow) {
            await Follow.create({
                user: req?.user._id,
                follower: userId,
            });

            return res.status(200).json(new apiResponse({}, "follow"));
        } else {
            await Follow.findByIdAndDelete(follow._id);
            return res.status(200).json(new apiResponse({}, "unfollow"));
        }
    }
);

//
