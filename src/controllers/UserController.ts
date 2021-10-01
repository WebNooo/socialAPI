import express from "express";
import { UserModel } from "../models/Index";
import jwt from "jsonwebtoken";
import md5 from "md5";
import { randomString, GMailService } from "../utils";
import { validationResult } from "express-validator";

class UserController {
  //SHOW
  async show(req: express.Request, res: express.Response) {
    //req.io.emit("msg", "test");

    const id: string = req.params.id ?? req.user._id;

    await UserModel.findById(id, "firstName lastName nick tag birthday city country photo lastSeen status gender", (err, user) => {
      if (err) return res.json({code: 1, message: "User Not Found" });

      res.json({code: 0, payload: user});
    });
  }

  // LOGIN
  async login(req: express.Request, res: express.Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    const password = md5(req.body.password);

    await UserModel.findOne(
      { email: req.body.email, password: password }, (err, user) => {
        if (user) {
          const token = jwt.sign({ _id: user._id },process.env.JWT_SECRET || "" );
          res.json({ code: 0, token: token });
        } else {
          res.json({ code: 1, message: "Не правильный логин или пароль" });
        }
      }
    );
  }

  //CREATE
  async create(req: express.Request, res: express.Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }

    const password = md5(req.body.password)

    const user = new UserModel({
      email: req.body.email,
      password: password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      birthday: req.body.birthday,
    });

    await user.save((err, user) => {
      if (err) {
        if (err.keyValue.email)
          return res.json({ code: 1, message: "Email alredy exists" });
        return res.json({ code: 2, message: "Create account invalid" });
      }

      if (user) {
        new GMailService().send(
          user.email,
          "Registration",
          "Congratulations! Your registration successfully!"
        );
        res.json({ code: 0, message: "account created" });
      } else {
        res.json({ code: 3, message: "account not created" });
      }
    });
  }

  //VERIFY
  async verify(req: express.Request, res: express.Response) {}

  //RESTORE
  async restore(req: express.Request, res: express.Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const generatePassword = randomString();
    const password = md5(generatePassword)

    await UserModel.findOneAndUpdate(
      { email: req.body.email },
      { password: password },
      async (err, user) => {
        if (user) {
          res.json({
            code: 0,
            message:
              "Password updated successfully. New password has been sent to your email!",
          });
          new GMailService().send(
            user.email,
            "New password",
            "NEW PASSWORD: " + generatePassword
          );
        } else {
          res.json({ code: 2, message: "User with this email was not found!" });
        }
      }
    );
  }
}

export default UserController;
