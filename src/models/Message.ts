import mongoose, {Schema} from "mongoose"
import validator from 'validator';

const messages = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Users",
        },
    dialog: {
        type: mongoose.Types.ObjectId, 
        ref: "dialogs",
        required: true
    },
    unread: {
        type: Boolean, 
        default: false
    },
    text: {
        type: String, 
        required: true
    },
    deleted: {
        type: Boolean, 
        default: false
    },

}, {timestamps: true});

const MessageModel = mongoose.model("messages", messages);

export default MessageModel;