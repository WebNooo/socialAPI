import mongoose, {Schema} from "mongoose"
import validator from 'validator';

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
        createDate:{type: String, default: new Date},
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

const UserModel = mongoose.model("Users", UserSchema);

export default UserModel;