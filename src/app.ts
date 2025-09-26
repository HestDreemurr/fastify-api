import { fastifySwagger } from "@fastify/swagger"
import { fastifySwaggerUi } from "@fastify/swagger-ui"
import { fastify } from "fastify"
import { jsonSchemaTransform, serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod"
import { fastifyJwt } from "@fastify/jwt"
import { routes } from "./routes"
import { BaseError } from "./routes/errors/base-error"
import { FastifyBaseError } from "./types/fastify"

const environment = process.env.NODE_ENV

const logger = {
    development: {
        transport: {
            target: "pino-pretty"
        }
    },
    production: true,
    test: false
}

const app = fastify({
    logger: logger[environment]
}).withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

if (environment !== "test") {
    app.register(fastifySwagger, {
        openapi: {
            info: {
                title: "Fastify API",
                description: "Example Fastify API with Swagger and integration tests with Vitest.",
                version: "1.0.0"
            },
            tags: [
                { name: "Example", description: "Example routes for testing" },
                { name: "Customers", description: "Customer auth endpoints" }
            ],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: "http",
                        scheme: "bearer",
                        bearerFormat: "JWT"
                    }
                }
            }
        },
        transform: jsonSchemaTransform
     })

    app.register(fastifySwaggerUi, {
        routePrefix: "/docs"
    })
}

app.register(fastifyJwt, {
    secret: process.env.JWT_SECRET
})

app.setErrorHandler((
    error: FastifyBaseError,
    request,
    reply
) => {
    if (error instanceof BaseError || error.validation) {
        return reply.status(error.status ?? 400).send({
            message: error.message
        })
    }

    request.log.debug(error)

    return reply.status(500).send({
        message: "Unexpected server error"
    })
})

app.register(routes)

export { app }