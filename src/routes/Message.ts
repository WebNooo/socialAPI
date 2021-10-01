import express from 'express'
import {MessageController} from '../controllers/Index'
import { checkAuth } from '../utils';

const MessageRouter = express.Router();

const messageController = new MessageController();

MessageRouter.post("/setRead", checkAuth, messageController.setRead)
MessageRouter.post("/create", checkAuth, messageController.create)
MessageRouter.get("/:id", checkAuth, messageController.index)

export default MessageRouter;
