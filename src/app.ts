import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import {UserRouter, DialogRouter, MessageRouter}  from './routes/Index'

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/social", {
    useUnifiedTopology: true, 
    useNewUrlParser: true,
    useCreateIndex: true
}, () => {
    console.log("DB connect");
})

app.use("/api/user", UserRouter)
app.use("/api/dialogs", DialogRouter)
app.use("/api/messages", MessageRouter)

app.get("/", (req: any, res: any) => {
    res.send("API SERVER");
});

app.listen(4000, () => {
    console.log("Server started on *:4000");
});