import CircuitBreaker from "opossum";

export default class CircuitBreakerService {
    private constructor(
        private breaker: CircuitBreaker
    ) {}

    static create(action: (...args: any[]) => Promise<any>, logger: boolean = true): CircuitBreakerService {
        const circuit_breaker = new CircuitBreaker(action, {
            timeout: 5000,
            errorThresholdPercentage: 50,
            resetTimeout: 10000,
        })

        if (logger) {
            circuit_breaker.on("open", () => console.warn("⚠️ Circuito aberto! Bloqueando chamadas."))
            circuit_breaker.on("halfOpen", () => console.warn("🟡 Circuito meio-aberto. Testando recuperação..."))
            circuit_breaker.on("close", () => console.warn("✅ Circuito fechado. Operando...."))
        }

        return new CircuitBreakerService(circuit_breaker)
    }

    disable(): void {
        this.breaker.disable()
    }

    async fire(...args: any[]): Promise<any> {
        return await this.breaker.fire(...args);
    }
}