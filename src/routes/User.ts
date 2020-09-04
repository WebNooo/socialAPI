import express from 'express'
import {UserController} from '../controllers/Index';

const UserRouter = express.Router();
const User = new UserController();


UserRouter.post("/create", User.create);
UserRouter.post("/login", User.login);
UserRouter.post("/restore", User.restore);
UserRouter.get("/", User.me);
UserRouter.get("/:id", User.show);

export default UserRouter;