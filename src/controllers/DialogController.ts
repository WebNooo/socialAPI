import express from "express"
import {DialogModel, UserModel} from "../models/Index"
import { validationResult } from "express-validator";


class DialogController {
    
    async index(req: express.Request, res: express.Response){
        const id = req.params.id;
        const query = id ? {_id: id, members: req.user._id, deleted: false} : {members: req.user._id, deleted: false}

        DialogModel.find(query)
        .populate("creator")
        .populate("members")
        .populate("lastMessage")
        .exec((err, dialogs) => {
            if(err) return res.json({code: 1, message: "Dialog not found"})
            res.json({code: 0, payload: dialogs});
        })
    }

    async create(req: express.Request, res: express.Response){
        const dialogue = new DialogModel({
            creator: req.user._id,
            members: [req.user._id, ...req.body.users]
        })
        
        await dialogue.save((err:any, obj: any) => {
            obj.populate("members", async (err:any, dSave:any) => {
                UserModel.find({_id: {$in: dSave.members}}, (err, data)=> {
                    data.map(n => {
                        //Сообщение придет только на последнее подключение, что бы пришло на все нужен массив ид подключений
                        if(n.connectId){
                            req.io.sockets.connected[n.connectId].emit("DIALOG:NEW", obj);
                        }
                    })
                })
                if(err) {
                    return res.json({code: 1, message:"Dialogue not created"});
                }
                res.json({code: 0, obj})
            })
        });
    }

    async add(req: express.Request, res: express.Response){
        
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

            await DialogModel.countDocuments({_id: req.body.id, members: req.body.user}, async (err:any, count:number) => {
                if(err) return res.json({code: 3, message: "Error get count user in dialog"});
                if(count < 1){
                    await DialogModel.findOneAndUpdate({_id: req.body.id, members: req.user._id}, {$addToSet: {members: req.body.user}}, (err, raw)=> {
                        if(err) return res.json({code: 1, message: "Dialog not found"});
                        res.json(
                            raw ? 
                            {code: 0, message: "user add to dialog"} : 
                            {code: 2, message: "user not add to dialog"}
                            )
                    });
                }else{
                    res.send({code: 2, message: "User exits in dialog"})
                }
            }).catch((err)=> {
            res.send({code: 5, message: "Error add"})
                
            });
     

        
    }

    async delete(req: express.Request, res: express.Response){

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        
        await DialogModel.findOneAndUpdate({_id: req.body.id, members: req.body.user, creator: req.user._id}, {$pull: {members: req.body.user}}, (err, raw)=> {
            if(err) return res.json({code: 1, message: "Dialog not found"});
            res.json(
                raw ? 
                {code: 0, message: "dialog remove"} : 
                {code: 2, message: "dialog not remove"}
                )
        });

    }





}

export default DialogController;