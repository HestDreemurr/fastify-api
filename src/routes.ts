import { helloWorld } from "./routes/hello-world";
import { signIn } from "./routes/sign-in";
import { FastifyApp } from "./types/fastify";

export async function routes(app: FastifyApp) {
    app.register(helloWorld)

    app.register(signIn)
}