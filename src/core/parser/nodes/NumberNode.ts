import Position from "../../Position";
import Token from "../../Token";

export default class NumberNode {
    public start?: Position;
    public end?: Position;

    constructor(public token: Token) {}

    toString() {
        return this.token.toString();
    }
}