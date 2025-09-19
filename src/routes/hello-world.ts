import { FastifyApp } from "@/types/fastify"
import z from "zod"

export async function helloWorld(app: FastifyApp) {
    app.get(
        "/hello",
        {
            schema: {
                tags: ["Example"],
                description: "Example route",
                response: {
                    200: z.object({
                        message: z.string()
                    }).describe("Successfull response")
                }
            }
        },
        async (request, reply) => {
            return reply.status(200).send({
                message: "Hello, world!"
            })
        }
    )
}