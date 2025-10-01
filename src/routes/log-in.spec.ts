import { prisma } from "@/lib/prisma"
import { beforeAll, describe, expect, it } from "vitest"
import request from "supertest"
import { app } from "@/server"
import { CustomerNotFoundError } from "./errors/customer-not-found"
import { InvalidPasswordError } from "./errors/invalid-password"
import { hash } from "bcryptjs"

describe("POST /log-in", async () => {
    beforeAll(async () => {
        await prisma.customer.create({
            data: {
                name: "John Doe",
                email: "johndoe@example.com",
                password: await hash("john123", 6)
            }
        })
    })

    it("should successfully log in", async () => {
        const response = await request(app.server)
            .post("/log-in")
            .send({
                email: "johndoe@example.com",
                password: "john123"
            })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("token")
    })

    it("should not log in an inexistent customer", async () => {
        const response = await request(app.server)
            .post("/log-in")
            .send({
                email: "janedoe@gmail.com",
                password: "jane123"
            })

        expect(response.status).toBe(404)
        expect(response.body.message).toBe(CustomerNotFoundError.message)
    })

    it("should not log in an customer with invalid password", async () => {
        const response = await request(app.server)
            .post("/log-in")
            .send({
                email: "johndoe@example.com",
                password: "invalid123"
            })

        expect(response.status).toBe(401)
        expect(response.body.message).toBe(InvalidPasswordError.message)
    })
})