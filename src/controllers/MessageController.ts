import express from "express";
import { MessageModel, DialogModel, UserModel } from "../models/Index";

class MessageController {

  async index(req: express.Request, res: express.Response) {
    const skipCount:number = Number(req.query.skip ? req.query.skip : 0);
    const dialogId = req.params.id;
    const countMessages = await MessageModel.countDocuments({ dialog: dialogId });

    if(countMessages > 0){
      await MessageModel.find({ dialog: dialogId }, {}, {skip: skipCount, limit: 50}).populate({path: "user", select:"firstName photo"}).sort({createdAt: 'desc'}).exec((err, messages) => {
        if (err) return res.send({code: 1, message:"Messages not found"});
        res.json({code: 0, payload: {count: countMessages, messages: messages.reverse()}});
      });
    }else{
      res.json({code: 0, payload: {count: 0, messages: []}});
    }
  }

  async setRead(req: express.Request, res: express.Response) {
    const messages = req.body.messages;
    const dialog = req.body.dialog;

      DialogModel.findById(dialog, (err:any, data:any)=>{
        if(err) return res.json({code: 4, message: "Error while getting dialog"});

        if(data.members.includes(req.user._id)){
          
          MessageModel.updateMany({_id: {$in: messages}, unread:false, dialog: dialog}, {$set:{unread: true}}, (err1, raw) => {

            if(err1) return res.json({code: 1, message: "Error set read"});

            MessageModel.countDocuments({dialog: dialog, unread:false}, (err2, count) => {
              if(err2) return res.json({code: 2, message: "Unread message count error"});

              UserModel.find({_id: {$in: data.members}}, (err3:any, user:any) => {
              if(err3) return res.json({code: 5, message: "Error send result to user"});
              const msg = raw.nModified > 0 ? messages : []; 

                user.map((n:any) => {
                  req.io.sockets.connected[n.connectId] && req.io.sockets.connected[n.connectId].emit("MESSAGES:READ", {dialog:dialog, unreadCount: count, messages:msg})
                  })
                res.json({code: 0, payload: {dialog:dialog, unreadCount: count, messages:msg}});

              })

            });

          });
          
        }else{
          res.json({code: 3, message: "You don`t have access to dialogue"})
        }
        
      })
  }

  async create(req: express.Request, res: express.Response) {
    //console.log(req.body);
    
    const message = new MessageModel({
      user: req.body.user,
      text: req.body.text,
      dialog: req.body.dialog,
    });
    await message.save(async (err, obj: any) => {
      obj.populate(
        [
          { path: "user", select: "firstName lastName photo" },
          { path: "dialog", select: "members" },
        ],
        async (err: any, messageSaved: any) => {
            await DialogModel.updateOne({_id: messageSaved.dialog._id}, {lastMessage: message._id});
            UserModel.find({_id: {$in: messageSaved.dialog.members}}, (err, data)=> {
                data.map(n => {
                    //Сообщение придет только на последнее подключение, что бы пришло на все нужен массив ид подключений
                    if(n.connectId){
                        req.io.sockets.connected[n.connectId].emit("MESSAGES:NEW", obj);
                    }
                })
                res.json({code: 0, payload: obj})
            })
        }
      );
    });


    //return res.json({code: 0, payload: message})

    //res.send("CREATE MESSAGE");
  }
}

export default MessageController;
