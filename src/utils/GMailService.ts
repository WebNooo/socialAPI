import * as mailer from "nodemailer"

export default class {
    private _tranporter: mailer.Transporter;

    constructor(){
        this._tranporter = mailer.createTransport(`smtps://${process.env.SMTP_USER}:${process.env.SMTP_PASSWORD}@${process.env.SMTP_HOST}:${process.env.SMTP_PORT}`);
    }

    send(mail:string, title:string, content:string){
        const options = {
            from: `${process.env.SMTP_AUTHOR} <${process.env.SMTP_USER}>`,
            to: mail,
            subject: title,
            html:content
        }

        this._tranporter.sendMail(options, (err, info) => {
            if(err) return console.log(err);
            //console.log(`Message Sent ${info.response}`);
        });
    }
}