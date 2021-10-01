import mongoose, {Schema, Document} from "mongoose"
import validator from 'validator';

// export interface IDialogs extends Document {
//     _id: mongoose.Types.ObjectId,
//     members: [
//         {
//             type: mongoose.Types.ObjectId,
//             ref: "Users"
//         }
//     ]
// }

const Dialogs = new Schema({
    creator: {
        type: mongoose.Types.ObjectId, 
        ref: "Users",
        required: true
    },
    members: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Users"
        }
    ],
    photo:{
        type: String,
        default:""
    },
    title:{
        type: String,
        default: ""
    },
    lastMessage: {
        type: mongoose.Types.ObjectId,
        ref: "messages",
        default: null
    },
    deleted: {
        type: Boolean, 
        default: false
    },


}, {
    timestamps: true
})

const DialogModel = mongoose.model("dialogs", Dialogs);

export default DialogModel;