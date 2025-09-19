import { fastifySwagger } from "@fastify/swagger"
import { fastifySwaggerUi } from "@fastify/swagger-ui"
import { fastify } from "fastify"
import { jsonSchemaTransform, serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod"
import { routes } from "./routes"

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

app.register(fastifySwagger, {
    openapi: {
        info: {
            title: "Fastify API",
            description: "Example Fastify API with Swagger and integration tests with Vitest.",
            version: "1.0.0"
        },
        tags: [
            { name: "Example", description: "Example routes for testing" }
        ]
    },
    transform: jsonSchemaTransform
})

app.register(fastifySwaggerUi, {
    routePrefix: "/docs"
})

app.register(routes)

export { app }