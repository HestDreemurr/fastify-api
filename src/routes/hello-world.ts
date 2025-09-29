import { auth } from "@/middlewares/auth"
import { FastifyApp } from "@/types/fastify"
import z from "zod"

export async function helloWorld(app: FastifyApp) {
    app.register(auth).get(
        "/hello",
        {
            schema: {
                tags: ["Example"],
                description: "Example route",
                security: [{ bearerAuth: [] }],
                response: {
                    200: z.object({
                        message: z.string()
                    }).describe("Successfull response")
                }
            }
        },
        async (request, reply) => {
            request.log.info(request.user)

            return reply.status(200).send({
                message: "Hello, world!"
            })
        }
    )
}