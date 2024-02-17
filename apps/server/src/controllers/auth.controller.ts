import { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import ApiError from "../utils/apiError";
import User from "../models/user.models";
import apiResponse from "../utils/apiResponse";
import { uploadOnCloudinary } from "../utils/cloudinary";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

type SignupData = {
    fullName: string;
    userName: string;
    email: string;
    password: string;
};

export const registerUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { fullName, userName, email, password } = req.body as SignupData;

        if (!fullName || !userName || !email || !password) {
            return next(new ApiError(400, "All fields are required !"));
        }

        if (!email.includes("@")) {
            return next(new ApiError(400, "Please enter valid email !"));
        }

        let user = await User.findOne({ userName: userName, email: email });

        if (user)
            return next(
                new ApiError(
                    409,
                    "User already Exist with this email or User Name "
                )
            );

        // const localAvatarFilePath = req?.file?.path;

        // console.log(localAvatarFilePath); // check

        // const avatar = await uploadOnCloudinary(localAvatarFilePath);

        user = await User.create({
            userName,
            fullName,
            email,
            password,
            // avatar: {
            //     url: avatar?.url,
            //     public_id: avatar?.url,
            // },
        });

        // extra call

        const registerUser = await User.findById(user._id);

        if (!registerUser)
            return next(
                new ApiError(
                    500,
                    "Internal Server error while saving data Please try again !"
                )
            );

        res.status(201).json(
            new apiResponse(registerUser, "User register successfully.")
        );
    }
);

export const loginUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new ApiError(400, "all fields are required !"));
        }

        const user = await User.findOne({
            $or: [{ email: email }, { userName: email }],
        });

        if (!user) {
            return next(
                new ApiError(404, "user not found with this username !")
            );
        }
        // decoding bcrypt
        const isMatch = bcrypt.compareSync(password, user.password);

        if (!isMatch) {
            return next(new ApiError(401, "Incorrect Password !"));
        }

        const logedInUser = await User.findById(user._id)?.select("-password ");

        const payload = { _id: user._id }; // payload for jwt

        const accessToken = jwt.sign(payload, process.env.PRIVATE_TOKEN, {
            expiresIn: process.env.PRIVATE_TOKEN_EXPIRES_TIME,
        });

        const optionsForAccess = {
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        }; // option for cookies

        res.status(200)
            .cookie("accessToken", accessToken, optionsForAccess)
            .json(new apiResponse(logedInUser, "User Loged in Successfully."));
    }
);

export const logoutUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const optionsForAccess = {
            httpOnly: true,
            secure: true,
        };

        return res
            .status(200)
            .clearCookie("accessToken", optionsForAccess)
            .json(new apiResponse(null, "User logged Out"));
    }
);
