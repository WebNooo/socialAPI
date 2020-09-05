import express from "express";
import { UserModel } from "./../models/Index";

export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    await UserModel.updateOne({_id: "5f515ba2fd60583eac3e2616" },  { $set:  { lastSeen: new Date() } })
    next();
}