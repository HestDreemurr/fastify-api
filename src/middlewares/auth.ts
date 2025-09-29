import { InvalidTokenError } from "@/routes/errors/invalid-token"
import { FastifyApp } from "@/types/fastify"
import fp from "fastify-plugin"

export const auth = fp(async (app: FastifyApp) => {
    app.addHook("onRequest", async (request) => {
        try {
            await request.jwtVerify()
        } catch {
            throw new InvalidTokenError()
        }
    })
})