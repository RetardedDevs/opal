import Token from "../core/Token";
import BaseError from "../errors/BaseError";

declare global {
    interface Array<T> {
        has(x: T): boolean
    }
}

if(!Array.prototype.has) {
    Object.defineProperty(Array.prototype, 'has', {
        enumerable: false,
        writable: false,
        configurable: false,
        value: function has<T>(el: T): boolean {
            return this.includes(el)
        }
    });
}

export interface Line {
    number: number,
    content: string
}

export interface Result {
    error: boolean,
    errorMessage?: BaseError | null,
    tokens: Token[]
}