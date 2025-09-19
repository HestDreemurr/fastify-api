import { app } from "./app"

const port = 3333

app.listen({ port }, () => {
    console.log("HTTP server running.")
})

export { app }