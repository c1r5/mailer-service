import {FastifyInstance} from "fastify";
import {sendEmailSchema, SendEmailSchema} from "@/src/api/view/send-email-schema";
import SendMailUsecases from "@/src/application/usecases/send-mail-usecases";

export default class SendEmailController {
    constructor(
        private send_mail_usecases: SendMailUsecases
    ) {}

    register_controller(fastify: FastifyInstance) {
        fastify.post<{
            Body: SendEmailSchema
        }>("/send-mail", {
            schema: {
                body: sendEmailSchema
            }
        }, async (request, reply) => {
            try {
                const {
                    from,
                    to,
                    subject,
                    body
                } = request.body;

                await this.send_mail_usecases.send_mail({
                    from,
                    to,
                    subject,
                    html: body
                })

                fastify.log.info(`📨 E-mail enviado para ${to}`);
                reply.send({ message: "E-mail enviado com sucesso!" });
            } catch (e) {
                fastify.log.error("❌ Erro ao enviar e-mail:", e);
                reply.status(500).send({ error: "Falha ao enviar e-mail. Tente novamente mais tarde." });
            }
        })
    }
}