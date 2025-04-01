import {SendMailOptions} from "nodemailer";

export type MailerConfig = {
    host: "localhost" | string,
    port: 433 | number,
    secure: false,
};

export type MailerSendMailOptions = SendMailOptions & {}

export interface MailerServiceInterface {
    send(options: MailerSendMailOptions): Promise<any>
    close(): void
}