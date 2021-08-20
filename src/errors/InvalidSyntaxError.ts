import Position from "../core/Position.js";
import BaseError from "./BaseError.js";

export default class InvalidSyntaxError extends BaseError {   
    constructor(message: string, start: Position, end: Position) {
        super('Invalid Syntax', message, start, end);
    }
}