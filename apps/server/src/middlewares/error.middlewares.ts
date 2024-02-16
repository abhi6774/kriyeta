import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/apiError";

const errorMiddleware = (err:ApiError,req:Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.message  = err.message || "Something went wrong 🥲"

    res.status(err.statusCode).json({
        success:err.success,
        message:err.message,
    })
} 

export default errorMiddleware;

