import express from "express";
import { UserModel } from "../models/Index";

class UserController {

    async show(req: express.Request, res: express.Response){
        const id: string = req.params.id;
        await UserModel.findById(id, (err, user) => {
            if(err){
                return res.status(404).json({message: "User Not Found"})
            }
                res.json(user)
        });
    }

    async me(req: express.Request, res: express.Response) {

    }

    async login(req: express.Request, res: express.Response) {

    }

    async create(req: express.Request, res: express.Response){
        const user = new UserModel({
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            gender: req.body.gender
        });

        try{
            await user.save()
            res.json(user)
        }
        catch(err) {
            res.json(err)
        };
    }


    async restore(req: express.Request, res: express.Response) {

    }

}

export default UserController