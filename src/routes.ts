import { helloWorld } from "./routes/hello-world";
import { FastifyApp } from "./types/fastify";

export async function routes(app: FastifyApp) {
    app.register(helloWorld)
}