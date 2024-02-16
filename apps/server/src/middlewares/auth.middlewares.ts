import { NextFunction, Request, Response } from "express";
import User from "../models/user.models";
import apiError from "../utils/apiError";
import asyncHandler from "../utils/asyncHandler";
import jwt from "jsonwebtoken";

const auth = asyncHandler(
    async (req: Request & {user:any}, res: Response, next: NextFunction) => {

        const { accessToken } = req.cookies;

        if (!accessToken) {
            return next( new apiError(401, "unauthorized user required !"));
        }

        const decodedToken =  jwt.verify(accessToken, process.env.PRIVATE_TOKEN);

        const id = decodedToken["_id"];
        
        const user = await User.findById(id).select(
            "-password -refreshToken"
        );

        if (!user) {
            throw new apiError(401, "Invail access Token");
        }

        req.user = user

        next();
    }
);

export default auth;
