import express from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "./../models/Index";


export default async (req: express.Request, res: express.Response, next:express.NextFunction) => {
    const token = req.header("token");
    if (!token) return res.json({code: 1, message: "Incorrect Token"})

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET || "");
        await UserModel.updateOne({_id: req.user._id },  { $set:  { lastSeen: new Date() } })
        next();
    }catch (err){
        res.json({code: 2, message: "Invalid Token"})
    }
}