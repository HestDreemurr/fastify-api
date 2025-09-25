import { FastifyBaseLogger, FastifyError, FastifyInstance, RawReplyDefaultExpression, RawRequestDefaultExpression, RawServerDefault } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"

export type FastifyApp = FastifyInstance<
    RawServerDefault,
    RawRequestDefaultExpression,
    RawReplyDefaultExpression,
    FastifyBaseLogger,
    ZodTypeProvider
>

export interface FastifyBaseError extends FastifyError {
    status: number
}