import Position from "../../Position";
import Token from "../../Token";
import NumberNode from "./NumberNode";

export default class BinaryNode {
    public start?: Position
    public end?: Position

    constructor(public left: NumberNode | BinaryNode, public operation: Token, public right: NumberNode | BinaryNode) {
        
    }

    toString() {
        return `(${this.left}, ${this.operation}, ${this.right})`
    }
}