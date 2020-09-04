import express from 'express'
import {DialogController} from '../controllers/Index'

const DialogRouter = express.Router();
const Dialog = new DialogController()

DialogRouter.get("/create", Dialog.create)
DialogRouter.get("/:id", Dialog.index)


export default DialogRouter;
