import { app } from "./app"

const port = 3333

app.listen({ port }, () => {
    app.log.info(`Docs running in http://localhost:${port}/docs`)
})

export { app }