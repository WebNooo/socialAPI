import express from 'express'
import {MessageController} from '../controllers/Index'
import { checkAuth } from '../utils';

const MessageRouter = express.Router();

const Messages = new MessageController();

MessageRouter.post("/create", checkAuth, Messages.create)
MessageRouter.get("/:id", checkAuth, Messages.index)

export default MessageRouter;
