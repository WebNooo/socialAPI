import express from "express";
import { UserModel } from "../models/Index";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { loginUser, createUser, restoreUser } from "./../utils/validation";
import { randomString, GMailService } from "../utils";


class UserController {

    async show(req: express.Request, res: express.Response){
        const id: string = req.params.id ?? req.user._id;

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

        const validate:any = loginUser.validate(req.body);
        if(validate.error) 
            return res.json({field: validate.error.details[0].path[0], message: validate.error.details[0].message});
        
        await UserModel.findOne({email: req.body.email}, async (err, user) => {
            if(user){
                if(!await bcrypt.compare(req.body.password, user.password)) 
                    return res.json({code: 1, message: "Incorrect login or password"});

                const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET || "")
                res.json({code: 0, token: token})
            }else{
                res.json({code: 1, message: "Incorrect login or password"})
            }
        })
    }

    async create(req: express.Request, res: express.Response){

        const validate = createUser.validate(req.body);

        if(validate.error){
            return res.json({field: validate.error.details[0].path[0], message: validate.error.details[0].message})
        }

        const password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(15)); 

        const user = new UserModel({
            email: req.body.email,
            password: password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            gender: req.body.gender
        });

        try{
            await user.save();
            new GMailService().send(user.email, "Registration", "Congratulations! Your registration successfully!");
        }
        catch(err) {
            if(err.keyValue.email) return res.json({code: 1, message: "Email alredy exists"})
            res.json(err)
        };
    }


    async restore(req: express.Request, res: express.Response) {
        const validate = restoreUser.validate(req.body);

        if(validate.error)
            return res.json({field: validate.error.details[0].path[0], message: validate.error.details[0].message})

        const generatePassword = randomString();
        const password = await bcrypt.hash(generatePassword, await bcrypt.genSalt(15)); 

        await UserModel.findOneAndUpdate({email: req.body.email}, {password: password}, async (err, user) => {
            if(user){
                res.json({code:0, message:"Password updated successfully. New password has been sent to your email!"});
                new GMailService().send(user.email, "New password", "NEW PASSWORD: "+generatePassword);
            }else{
                res.json({code:2, message: "User with this email was not found!"})
            }
        });
    }

}

export default UserController