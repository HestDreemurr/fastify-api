import { BaseError } from "./base-error"

const message = "This customer already exists."
const status = 409

export class CustomerAlreadyExistsError extends BaseError {
    public static message: string = message
    public static status: number = status

    constructor() {
        super({
            message,
            status
        })
    }
}