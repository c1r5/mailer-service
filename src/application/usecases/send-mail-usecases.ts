import {MailerSendMailOptions, MailerServiceInterface} from "@domain/models/mailer-service-interface";
import CircuitBreakerService from "@application/services/circuit-breaker-service";

export default class SendMailUsecases {
    circuit_breaker_service: CircuitBreakerService
    constructor(
        mailer_service: MailerServiceInterface
    ) {
        this.circuit_breaker_service = CircuitBreakerService.create(mailer_service.send.bind(mailer_service));
    }

    async send_mail(options: MailerSendMailOptions): Promise<any> {
       return await this.circuit_breaker_service.fire(options)
    }
}