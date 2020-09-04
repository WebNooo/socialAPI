import mongoose, {Schema} from "mongoose"
import validator from 'validator';

const messages = new Schema({
    user: {type: String, required: true},
    dialog: {type: String, required: true},
    unread: {type: Boolean, default: false},
    text: {type: String, required: true},

});

const MessageModel = mongoose.model("messages", messages);

export default MessageModel;