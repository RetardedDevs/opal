import BinaryNode from "./trees/BinaryNode";
import NumberNode from "./trees/NumberNode";
import Token from "../Token";
import { EXPR_OPS, FACTOR_OPS, TERM_OPS, TOKEN_TYPES } from "../../utils/Constants";


export default class Parser {
    private index: number;
    private token: Token;

    constructor(public tokens: Token[]) {
        this.index = -1;
        this.advance()
    }

    advance() {
        this.index++;

        if(this.index < this.tokens.length) {
            this.token = this.tokens[this.index];
        } 

        return this.token;
    }

    parse() {
        const res = this.expression();

        return res;
    }

    factor() {
        const token = this.token;

        if(FACTOR_OPS.includes(token.type)) {
            this.advance();

            return new NumberNode(token);
        }
    }

    term() {
       return this.createBinaryNode(this.factor.bind(this), [TOKEN_TYPES.DIV, TOKEN_TYPES.MULT])
    }

    expression () {
       return this.createBinaryNode(this.term.bind(this), [TOKEN_TYPES.PLUS, TOKEN_TYPES.MINUS])
    }

    createBinaryNode(func: Function, operators: string[]) {
        const left = func();
        let res: BinaryNode;

        while (operators.includes(this.token.type)) {
            const operation = this.token;

            this.advance();

            const right = func();

            res = new BinaryNode(left, operation, right)
        }

        return res;
    }
}
