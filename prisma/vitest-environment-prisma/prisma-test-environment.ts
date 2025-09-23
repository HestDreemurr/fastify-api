import { PrismaClient } from "@prisma/client"
import { execSync } from "child_process"
import { randomUUID } from "crypto"
import { Environment } from "vitest/environments"

const prisma = new PrismaClient()
const prismaCLI = "node_modules/.bin/prisma"

const databaseURL = new URL(process.env.DATABASE_URL ?? "")
databaseURL.pathname = "/test"

const schema = randomUUID()

databaseURL.searchParams.set("schema", schema)

export default <Environment>{
    name: "prisma",
    transformMode: "ssr",

    setup(globals) {
        process.env.DATABASE_URL = databaseURL.toString()
        globals.process.env.DATABASE_URL = databaseURL.toString()

        execSync(`${prismaCLI} db push`)

        return {
            async teardown() {
                await prisma.$executeRawUnsafe(`
                    DROP SCHEMA IF EXISTS "${schema}" CASCADE
                `)

                await prisma.$disconnect()
            }
        }
    }
}