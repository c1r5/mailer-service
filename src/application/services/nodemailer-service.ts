import {
    MailerConfig, MailerSendMailOptions,
    MailerServiceInterface
} from "@domain/models/mailer-service-interface";
import { Transporter } from "nodemailer";
import nodemailer from "nodemailer";

export class NodemailerService implements MailerServiceInterface {
    private static instance?: NodemailerService;

    private constructor(private transporter: Transporter) {}

    close(): void {
        this.transporter.close();
    }

    static get_instance(config: MailerConfig): NodemailerService {
        if (this.instance) return this.instance;

        if (!config) {
            throw new Error("Configuração do Mailer é obrigatória na primeira chamada.");
        }

        this.instance = new NodemailerService(nodemailer.createTransport({
            ...config,
            pool: true
        }));

        return this.instance;
    }

    async send(options: MailerSendMailOptions): Promise<any> {
        return await this.transporter.sendMail(options);
    }
}
