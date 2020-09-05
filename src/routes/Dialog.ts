import express from 'express'
import {DialogController} from '../controllers/Index'

const DialogRouter = express.Router();
const Dialog = new DialogController()

DialogRouter.get("/create", Dialog.create)
DialogRouter.delete("/delete", Dialog.delete)
DialogRouter.post("/add", Dialog.add)
DialogRouter.get("/", Dialog.index)
DialogRouter.get("/:id", Dialog.index)


export default DialogRouter;
