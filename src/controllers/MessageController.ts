import mongoose from "mongoose";
import express from 'express'
import {MessageModel, DialogModel} from "../models/Index"


class MessageController {
    constructor() {
        
    }

    async index (req: express.Request, res: express.Response) {
        const dialogId = req.params.id
        await MessageModel.find({dialog: dialogId})
        .exec((err, messages) => {
            if(err) return res.status(404).send("Messages not found")
            res.json(messages);
        })
    }

    async create (req: express.Request, res: express.Response) {
        const message = new MessageModel({
            user: req.body.user,
            text: req.body.text,
            dialog: req.body.dialog
        });
        await message.save();
        await DialogModel.updateOne({_id: req.body.dialog}, {lastMessage: message._id});
        res.send("CREATE MESSAGE");
    }
}

export default MessageController;