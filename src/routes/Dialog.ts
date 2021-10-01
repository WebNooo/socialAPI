import express from 'express'
import {DialogController} from '../controllers/Index'
import {checkAuth} from '../utils'
import {dialogValidation} from '../utils/validation';

const DialogRouter = express.Router();
const dialogController = new DialogController();

DialogRouter.post("/create", checkAuth, dialogController.create)
DialogRouter.delete("/delete", checkAuth, dialogValidation, dialogController.delete)
DialogRouter.post("/add", checkAuth, dialogValidation, dialogController.add)
DialogRouter.get("/", checkAuth, dialogController.index)
DialogRouter.get("/:id", checkAuth, dialogController.index)


export default DialogRouter;
