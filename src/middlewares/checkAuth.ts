import express from "express";
import {verifyToken} from "./../utils"
import { IUser } from "../models/User";
import jwt from "jsonwebtoken";


export default (req: express.Request, res: express.Response, next:express.NextFunction) => {
     let token = req.header('auth-token');
    // if (token) {
    //     try {
    //         req.user = jwt.verify(token, process.env.JWT_SECRET || "");
    //         res.send(req.user)
    //         next();
    //     }catch (err){
    //         res.send(err);
    //     }
    // }
    // return res.send({message: "Token not found"});

    verifyToken(token)
    .then((user) => {
        req.user = user
        next();
    }).catch(() => {
        res.status(403).json({message: "Invlaid auth token provided"})
    });
}