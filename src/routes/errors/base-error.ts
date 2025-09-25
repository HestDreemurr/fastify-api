export interface IBaseError {
    message: string,
    status: number
}

export class BaseError extends Error {
    public status: number

    constructor({
        message,
        status
    }: IBaseError) {
        super(message)

        this.status = status

        Object.setPrototypeOf(this, BaseError.prototype)
    }
}