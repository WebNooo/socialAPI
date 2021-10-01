import express from 'express'
import { UserController } from '../controllers/Index';
import { checkAuth } from '../utils';
import { loginValidation, createValidation, restoreValidation } from '../utils/validation';

const userController = new UserController();

const UserRouter = express.Router();

UserRouter.post("/create", createValidation, userController.create);
UserRouter.post("/login", loginValidation, userController.login);
UserRouter.post("/restore",restoreValidation, userController.restore);
UserRouter.post("/verify", userController.verify);
UserRouter.get("/", checkAuth, userController.show);
UserRouter.get("/:id", checkAuth, userController.show);


export default UserRouter;