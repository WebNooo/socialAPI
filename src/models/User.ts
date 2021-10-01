import mongoose, {Schema, Document} from "mongoose"
import validator from 'validator';
import {differenceInMinutes} from "date-fns";

export interface IUser extends Document{
    email: string,
    password:string,
    nick:string,
    tag:string,
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
    confirmHash?:String,
    connectId:string,
    isOnline:boolean
}

const UserSchema = new Schema(
    {
        email:{type: String, required: true, unique:true, validate: [validator.isEmail, "Invalid Email"]},
        password:{type: String, required: true},
        nick: {type: String},
        tag: {type: String, unique:true},
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
        confirmHash: {type: String},
        connectId: {type: String}
    },
    {
        timestamps: true
    }
);

UserSchema.virtual('isOnline').get(function(this:IUser) {
    return differenceInMinutes(new Date(), this.lastSeen || Date.now() / 1000) < 1;
})

UserSchema.virtual('isOnlineMinutes').get(function(this:IUser) {
    return differenceInMinutes(new Date(), this.lastSeen || Date.now() - Date.now());
})
UserSchema.set('toJSON', {virtuals: true})
const UserModel = mongoose.model<IUser>("Users", UserSchema);

export default UserModel;