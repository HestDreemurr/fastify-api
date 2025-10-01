import { BaseError } from "./base-error"

const message = "Customer not found."
const status = 404

export class CustomerNotFoundError extends BaseError {
    public static message: string = message
    public static status: number = status

    constructor() {
        super({
            message,
            status
        })
    }
}