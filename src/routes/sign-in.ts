import { prisma } from "@/lib/prisma"
import { FastifyApp } from "@/types/fastify"
import z from "zod"

export async function signIn(app: FastifyApp) {
    app.post(
        "/sign-in",
        {
            schema: {
                tags: ["Customers"],
                description: "Create an customer and generate token",
                body: z.object({
                    name: z.string().min(3),
                    email: z.email(),
                    password: z.string().min(6)
                }),
                response: {
                    201: z.object({
                        token: z.string()
                    }).describe("Created customer"),
                    409: z.object({
                        message: z.string()
                    }).describe("Customer already exists")
                }
            }
        }, 
        async (request, reply) => {
            const { name, email, password } = request.body

            const customerAlreadyExists = await prisma.customer.findUnique({
                where: {
                    email
                }
            })

            if (customerAlreadyExists) {
                return reply.status(409).send({
                    message: "This customer already exists."
                })
            }
            
            // Criptografar a senha
            
            await prisma.customer.create({
                data: {
                    name,
                    email,
                    password
                }
            })

            // Gerar o token

            return reply.status(201).send({ token: "" })
        }
    )
}