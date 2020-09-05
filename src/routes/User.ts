import express from 'express'
import {UserController} from '../controllers/Index';
import { checkAuth } from '../middlewares/Index';

const UserRouter = express.Router();
const User = new UserController();


UserRouter.post("/create", User.create);
UserRouter.post("/login", User.login);
UserRouter.post("/restore", User.restore);
UserRouter.get("/", checkAuth, User.show);
UserRouter.get("/:id", checkAuth, User.show);


export default UserRouter;