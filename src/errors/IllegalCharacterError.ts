import BaseError from "./BaseError.js";
import Position from "../classes/Position.js";

export default class IllegalCharacterError extends BaseError {
    constructor(public message: string, protected start: Position, protected end: Position) {
        super('Illegal Character', message, start, end);
    }
}