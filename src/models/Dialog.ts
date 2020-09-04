import mongoose, {Schema} from "mongoose"
import validator from 'validator';

const Dialogs = new Schema({
    creator: {type: String, required: true},
    members: [{type: mongoose.Types.ObjectId, ref: "users"}],
    title: {type: String, default: ""},
    lastMessage: {type: String, default: ""}
}, {timestamps: true})

const DialogModel = mongoose.model("dialogs", Dialogs);

export default DialogModel;