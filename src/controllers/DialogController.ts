import express from "express"
import {DialogModel} from "../models/Index"
import mongoose from "mongoose";

class DialogController {
    constructor() {
        
    }

    async index(req: express.Request, res: express.Response){
        const id = req.params.id;
        const user = "5f515ba2fd60583eac3e2616";
        const query = id ? {_id: id, members: user, deleted: false} : {members: user, deleted: false}

        DialogModel.find(query)
        .populate("creator")
        .populate("members")
        .exec((err, dialogs) => {
            if(err) return res.json({message: "Dialog not found"})
            res.json(dialogs);
        })
    }

    async create(req: express.Request, res: express.Response){
        // const dialog1 = new DialogModel({
        //     creator: "5f515ba2fd60583eac3e2616",
        //     members: ["5f515ba2fd60583eac3e2616", "5f51f6346bf66b3ee017e5bd"]
        // });

        // await dialog1.save();

        // const dialog2 = new DialogModel({
        //     creator: "5f51f6496bf66b3ee017e5be",
        //     members: ["5f51f6346bf66b3ee017e5bd", "5f51f6496bf66b3ee017e5be"]
        // });

        // await dialog2.save((err) => {
        //     if(err) return res.json(err);
        // });

        res.send("create dialogs")
    }

    async add(req: express.Request, res: express.Response){
        const user = req.body.user;
        const id = req.body.id;

        await DialogModel.findOneAndUpdate({_id: id, members: "5f515ba2fd60583eac3e2616"}, {$addToSet: {members: user}}, (err, raw)=> {
            if(err) return res.json("Dialog not found");
            res.send("user add to dialog")
        });

    }

    async delete(req: express.Request, res: express.Response){
        const user = req.body.user;
        const id = req.body.id; 
        
        await DialogModel.findOneAndUpdate({_id: id, members: user}, {$pull: {members: user}}, (err, raw)=> {
            if(err) return res.json("Dialog not found");
            res.send("dialog remove")
        });

    }





}

export default DialogController;