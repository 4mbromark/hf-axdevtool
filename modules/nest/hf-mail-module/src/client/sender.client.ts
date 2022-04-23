import { ISendMailOptions, MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { SentMessageInfo } from 'nodemailer';

@Injectable()
export class HighFiveMailSenderClient {

    constructor(
        private readonly client: MailerService
    ) { }

    public async send(mail: ISendMailOptions): Promise<SentMessageInfo> {
        return new Promise<void>(async (resolve, reject) => {
            await this.client.sendMail(mail).then((info: SentMessageInfo) => {
                resolve(info);
            }).catch((error: Error) => {
                reject(error);
            });
        })
    }
}