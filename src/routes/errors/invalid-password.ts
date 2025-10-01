import { BaseError } from "./base-error"

const message = "Invalid customer password."
const status = 401

export class InvalidPasswordError extends BaseError {
    public static message: string = message
    public static status: number = status

    constructor() {
        super({
            message,
            status
        })
    }
}