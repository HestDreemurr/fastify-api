import { FastifyApp } from "@/types/fastify";
import z from "zod";
import { CustomerNotFoundError } from "./errors/customer-not-found";
import { InvalidPasswordError } from "./errors/invalid-password";
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";

export async function logIn(app: FastifyApp) {
    app.post(
        "/log-in",
        {
            schema: {
                tags: ["Customers"],
                description: "Validate an customer",
                body: z.object({
                    email: z.email(),
                    password: z.string().min(6)
                }),
                response: {
                    200: z.object({
                        token: z.string()
                    }).describe("Logged in"),
                    404: z.object({
                        message: z.literal(CustomerNotFoundError.message)
                    }).describe("Customer not found"),
                    401: z.object({
                        message: z.literal(InvalidPasswordError.message)
                    }).describe("Invalid password")
                }
            }
        },
        async (request, reply) => {
            const { email, password } = request.body

            const customer = await prisma.customer.findUnique({
                where: {
                    email
                }
            })

            if (!customer) {
                throw new CustomerNotFoundError()
            }

            const isPasswordValid = await compare(password, customer.password)

            if (!isPasswordValid) {
                throw new InvalidPasswordError()
            }

            const token = await reply.jwtSign({ id: customer.id })

            return reply.status(200).send({ token })
        }
    )
}