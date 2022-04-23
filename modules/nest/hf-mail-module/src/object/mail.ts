import { Address } from "nodemailer/lib/mailer";

export class HighFiveMailMessage {
    from: string | Address;
    sender: string | Address;

    to: Array<string | Address>;
    cc: Array<string | Address>;
    bcc: Array<string | Address>;

    text: string;
    html: string;

    subject: string;
}