import { HighFiveMailMessage } from './../object/mail';
import { HighFiveMailSenderClient } from './../client/sender.client';
import { Injectable, Logger } from "@nestjs/common";
import { ISendMailOptions } from '@nestjs-modules/mailer';
import { rejects } from 'assert';
import { SentMessageInfo } from 'nodemailer';

@Injectable()
export class HighFiveMailSenderService {
    private readonly logger = new Logger(HighFiveMailSenderService.name);

    constructor(
        private readonly mailSenderClient: HighFiveMailSenderClient
    ) { }

    public async newMessage(message: HighFiveMailMessage, text: string): Promise<void> {
        const mail: ISendMailOptions = this.buildMail(message);
        return this.sendMessage(mail);
    }

    private buildMail(message: HighFiveMailMessage): ISendMailOptions {
        const mail: ISendMailOptions = new Object();
        mail.from = message.from;
        mail.sender = message.sender;

        mail.to = message.to;
        mail.cc = message.cc;
        mail.bcc = message.bcc;

        mail.subject = message.subject;

        mail.text = message.text;
        mail.html = message.html;

        return mail;
    }

    private async sendMessage(mail: ISendMailOptions): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            await this.mailSenderClient.send(mail).then((info: SentMessageInfo) => {
                this.logger.log('Message sent: ' + info.response);
                this.logger.log('Message ID: ' + info.messageId);
                resolve();
            }).catch((e: Error) => {
                this.logger.error('Message failed');
                this.logger.error('Message error: ' + e);
                reject();
            });
        });
    }
}