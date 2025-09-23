import { defineConfig } from "vitest/config"
import tsConfigPaths from "vite-tsconfig-paths"

export default defineConfig({
    test: {
        coverage: {
            provider: "v8"
        },
        environment: "./prisma/vitest-environment-prisma"
    },
    plugins: [tsConfigPaths()]
})