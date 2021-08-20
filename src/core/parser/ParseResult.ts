import BaseError from "../../errors/BaseError";
import BinaryNode from "./nodes/BinaryNode";
import NumberNode from "./nodes/NumberNode";

export default class ParseResult {
    node: BinaryNode | NumberNode
    error: BaseError

    constructor() {}

    register(res) {
        if(res instanceof ParseResult) {
            if(res.error) this.error = res.error;

            return res.node;
        }

        return res;
    }

    success(node) {
        this.node = node;
        return this;
    }

    rejected(error) {
        this.error = error;
        return this;
    }
}