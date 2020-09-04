import express from "express"
import {DialogModel} from "../models/Index"

class DialogController {
    constructor() {
        
    }

    async index(req: express.Request, res: express.Response){

        const id = req.params.id;
        const user = "5f515ba2fd60583eac3e2616";

        //res.send(id);

        DialogModel.find({_id: id, members: user}, (err, dialog) => {
            res.json(dialog);
        })

    }

    async create(req: express.Request, res: express.Response){
        const dialog1 = new DialogModel({
            creator: "5f515ba2fd60583eac3e2616",
            members: ["5f515ba2fd60583eac3e2616", "5f51f6496bf66b3ee017e5be"]
        });

        await dialog1.save();

        const dialog2 = new DialogModel({
            creator: "5f51f6496bf66b3ee017e5be",
            members: ["5f51f6346bf66b3ee017e5bd", "5f51f6496bf66b3ee017e5be"]
        });

        await dialog2.save();

        res.send("create dialogs")
    }


}

export default DialogController;