import mongoose, {Schema, Document} from "mongoose"
import validator from 'validator';

export interface IUser extends Document{
    email: String,
    password:String,
    firstName:String,
    lastName:String,
    birthday?:Date,
    city?:Number,
    country?:Number,
    photo?:String,
    lastSeen?:Date,
    createDate?:Date,
    createIp?:String,
    status?:String,
    gender:Number,
    confirmed?:Boolean,
    confirmHash?:String
}

const UserSchema = new Schema(
    {
        email:{type: String, required: true, unique:true, validate: [validator.isEmail, "Invalid Email"]},
        password:{type: String, required: true},
        firstName:{type: String, required: true},
        lastName:{type: String, required: true},
        birthday:{type: Date},
        city:{type: Number, default: 0},
        country:{type: Number, default: 0},
        photo:{type: String},
        lastSeen:{type: Date},
        createDate:{type: Date, default: new Date},
        createIp:{type: String},
        status:{type: String},
        gender:{type: Number, required: true, default: 0},
        confirmed: {type: Boolean, default: false},
        confirmHash: {type: String}
    },
    {
        timestamps: true
    }
);

const UserModel = mongoose.model<IUser>("Users", UserSchema);

export default UserModel;