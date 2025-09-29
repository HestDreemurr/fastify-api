import { describe, expect, it } from "vitest"
import request from "supertest"
import { app } from "@/server"

describe("GET /hello", () => {
    it("should return \"Hello, world!\"", async () => {
        const token = app.jwt.sign({ id: "1234" })

        const response = await request(app.server)
            .get("/hello")
            .set("Authorization", `Bearer ${token}`)

        expect(response.status).toBe(200)
        expect(response.body).toEqual({
            message: "Hello, world!"
        })
    })
})