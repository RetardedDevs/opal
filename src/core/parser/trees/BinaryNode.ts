import Position from "../../Position";
import Token from "../../Token";
import NumberNode from "./NumberNode";

export default class BinaryNode {
    public start: Position
    public end: Position

    constructor(public left: NumberNode, public operation: Token, public right: NumberNode) {
        this.start = left.start
        this.end = right.end
    }

    toString() {
        return `(${this.left}, ${this.operation}, ${this.right})`
    }
}