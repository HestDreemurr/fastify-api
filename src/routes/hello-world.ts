import { FastifyApp } from "@/types/fastify"

export async function helloWorld(app: FastifyApp) {
    app.get(
        "/hello",
        {
            schema: {
                tags: ["Example"]
            }
        },
        async (request, reply) => {
            return reply.send({
                message: "Hello, world!"
            })
        }
    )
}