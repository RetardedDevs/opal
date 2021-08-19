import Token from "../core/Token";
import BaseError from "../errors/BaseError";

export interface Line {
    number: number,
    content: string
}

export interface Result {
    error: boolean,
    errorMessage?: BaseError | null,
    tokens: Token[]
}