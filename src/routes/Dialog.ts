import express from 'express'
import {DialogController} from '../controllers/Index'
import {checkAuth} from '../middlewares/Index'

const DialogRouter = express.Router();
const Dialog = new DialogController()

DialogRouter.get("/create", checkAuth, Dialog.create)
DialogRouter.delete("/delete", checkAuth, Dialog.delete)
DialogRouter.post("/add", checkAuth, Dialog.add)
DialogRouter.get("/", checkAuth, Dialog.index)
DialogRouter.get("/:id", checkAuth, Dialog.index)


export default DialogRouter;
