import Position from "../../Position";
import Token from "../../Token";

export default class NumberNode {
    public start: Position;
    public end: Position;

    constructor(public token: Token) {
        this.start = this.token.start;
        this.end = this.token.end;
    }

    toString() {
        return this.token.toString();
    }
}