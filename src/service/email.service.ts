import nodemailer, {createTransport, Transporter} from 'nodemailer';
import {configDotenv} from "dotenv";

configDotenv({path: "../../.env"});


class EmailService {

    transporter: Transporter;

    constructor() {
        this.transporter = createTransport({
            //@ts-ignore
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            auth: {
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASS
            }
        });
    }

     async sendEmail(to: string, link: string) {
        await this.transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject: 'Активация аккаунта',
            text: '',
            html:
                `
                    <div>
                      <h1>Для активации перейдите по ссылке</h1>
                      <a href="${link}">${link}</a>
                    </div>
                `
        });
    }
}

export default EmailService;