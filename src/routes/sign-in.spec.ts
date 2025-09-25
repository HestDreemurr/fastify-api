import { describe, expect, it } from "vitest"
import request from "supertest"
import { app } from "@/server"
import { CustomerAlreadyExistsError } from "./errors/customer-already-exists"

describe("POST /sign-in", () => {
    it("should successfully create an customer", async () => {
        const response = await request(app.server)
            .post("/sign-in")
            .send({
                name: "John Doe",
                email: "johndoe@example.com",
                password: "john123"
            })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("token")
    })

    it("should not create an customer when it already exists", async () => {
        const response = await request(app.server)
            .post("/sign-in")
            .send({
                name: "John Doe",
                email: "johndoe@example.com",
                password: "john123"
            })

        expect(response.status).toBe(409)
        expect(response.body.message).toBe(CustomerAlreadyExistsError.message)
    })
})