import {NodemailerService} from "@/src/application/services/nodemailer-service";
import SendEmailController from "@/src/api/controllers/send-email-controller";
import Fastify from "fastify";
import {serializerCompiler, validatorCompiler} from "fastify-type-provider-zod";
import SendMailUsecases from "@/src/application/usecases/send-mail-usecases";

(async () => {
    const fastify = Fastify({
        logger: true,
    })

    fastify.setValidatorCompiler(validatorCompiler);
    fastify.setSerializerCompiler(serializerCompiler);

    const mailer = NodemailerService.get_instance({
        host: "localhost",
        port: 1025,
        secure: false
    });
    const send_mail_usecases = new SendMailUsecases(mailer);
    const send_mail_controller = new SendEmailController(send_mail_usecases);

    send_mail_controller.register_controller(fastify)

    try {
        await fastify.listen({ port: 3000, host: "0.0.0.0" });
        fastify.log.info("🚀 Servidor de e-mail rodando na porta 3000");
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }

})();