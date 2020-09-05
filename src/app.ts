import mongoose from 'mongoose';
import express from 'express';
import {UserRouter, DialogRouter, MessageRouter}  from './routes/Index'
import {updateLastSeen, checkAuth} from './middlewares/Index';
import dotenv from "dotenv"

const app = express();

dotenv.config();

export interface ProcessEnv {
    [key: string]: string | undefined
}

mongoose.connect(process.env.DB_CONNECT ?? '', {
    useUnifiedTopology: true, 
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}, () => {
    console.log("DB connect");
})

app.use(express.json());
app.use(updateLastSeen)
app.use(checkAuth)



app.use("/api/user", UserRouter)
app.use("/api/dialogs", DialogRouter)
app.use("/api/messages", MessageRouter)

app.get("/", (req: any, res: any) => {
    res.send("API SERVER");
});

app.listen(process.env.PORT, () => {
    console.log(`Server started on *:${process.env.PORT}`);
});