import express from 'express';
import http from 'http';
import {UserRouter, DialogRouter, MessageRouter}  from './routes/Index'
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

import cors from "cors"
import socket from "socket.io";


const app = express();
app.use(express.json());


app.use(cors())
dotenv.config();

const server = http.createServer(app);
const io = socket(server); 

import "./core/db"
import UserModel from './models/User';


app.use((req:express.Request, res:express.Response, next:express.NextFunction) =>{
    req.io = io;
    next()
} )

io.on('connection', async (sock) => {
    
    let token = sock.handshake.query.token;

    if(token !== "" && token !== undefined && token !== "undefined"){

        const user:any = jwt.verify(token, process.env.JWT_SECRET || "")
        if(user){
            await UserModel.updateOne( { _id: user._id }, { $set: { connectId:sock.id } } );
            sock.on("disconnecting", async () => {
                await UserModel.updateOne( { _id: user._id }, { $set: { connectId:"" } } );
            })
        }
    }
});


app.use("/api/user", UserRouter)
app.use("/api/dialogs", DialogRouter)
app.use("/api/messages", MessageRouter)

app.get("/", (req: express.Request, res: express.Response) => {
    res.send("API SERVER");
});



server.listen(process.env.PORT,  () => {
    console.log(`Server started on *:${process.env.PORT}`);
});