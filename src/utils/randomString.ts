import { string } from "@hapi/joi";

export default (lenght: number = 12):string => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_$-";
    let result:string = "";
    for(let i:number = 0; i < lenght; i++)
    {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result;
}