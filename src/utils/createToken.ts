import jwt from "jsonwebtoken";
import { IUser } from "../models/User";
import  {reduce} from "lodash";

export default (user:IUser) => {

    let token = jwt.sign({
        data: reduce(user, (result, value, key)=>{
            if(key !== 'password')
                result[key] = value

            return result
        })
    }, process.env.JWT_SECRET ?? '')
    return token
}