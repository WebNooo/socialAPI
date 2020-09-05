import express from 'express'
import {MessageController} from '../controllers/Index'

const MessageRouter = express.Router();

const Messages = new MessageController();

MessageRouter.post("/create", Messages.create)
MessageRouter.get("/:id", Messages.index)

export default MessageRouter;
