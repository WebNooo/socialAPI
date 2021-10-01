import mongoose from 'mongoose';

mongoose.connect(process.env.DB_CONNECT || "", {
    useUnifiedTopology: true, 
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}, () => {
    console.log("DB connect");
})