import { BaseError } from "./base-error"

const message = "Invalid or missing token."
const status = 401

export class InvalidTokenError extends BaseError {
    public static message: string = message
    public static status: number = status

    constructor() {
        super({
            message,
            status
        })
    }
}