import { NextFunction, Request, Response } from "express";
import User from "../models/user.models";
import apiError from "../utils/apiError";
import asyncHandler from "../utils/asyncHandler";
import jwt from "jsonwebtoken";

const auth = asyncHandler(
    async (req: Request & {user:any}, res: Response, next: NextFunction) => {
        
        try {
            const { accessToken } = req.cookies;
        
            if (!accessToken) {
                console.log("Access Token Not available")
                return next( new apiError(401, "unauthorized user required !"));
            }
            
            console.log("Access token", accessToken)
            
            const decodedToken =  jwt.verify(accessToken, process.env.PRIVATE_TOKEN);
            console.log("Decoded Token", decodedToken)
    
            const id = decodedToken["_id"];
            
            const user = await User.findById(id).select(
                "-password -refreshToken"
            );
            
            console.log(user);

            if (!user) {
                throw new apiError(401, "Invail access Token");
            }
    
            req.user = user
        } catch(error) {
            console.log(error)
        }

        next();
    }
);

export default auth;
