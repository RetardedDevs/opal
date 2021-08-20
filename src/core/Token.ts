import { TOKEN_TYPES } from "../utils/Constants";
import Position from "./Position";

export default class Token {
    constructor(public type: TOKEN_TYPES, public value?: any, public start?: Position, public end?: Position) {
        if(start) {
            this.start = start.copy()
            this.end = start.copy()
            this.end.advance()
        }

        if(end) {
            this.end = end
        }
    }

    toString() {
        if(this.value) return `${this.type}:${this.value}`

        return this.type
    }
}