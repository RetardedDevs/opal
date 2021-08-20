import BinaryNode from "./nodes/BinaryNode";
import NumberNode from "./nodes/NumberNode";
import UnaryNode  from "./nodes/UnaryNode";
import Token from "../Token";
import ParseResult from "./ParseResult";
import { TOKEN_TYPES as TT} from "../../utils/Constants";
import InvalidSyntaxError from "../../errors/InvalidSyntaxError";

export default class Parser {
    private token: Token;
    private iterator: Iterator<Token>;


    constructor(public tokens: Token[]) {
        this.iterator = tokens[Symbol.iterator]();
        this.advance()
    }

    parse () {
        const res = this.expr();

        if(!res.error && this.token.type !== TT.EOF) {
            return res.rejected(new InvalidSyntaxError(`Expected '+', '-', '*', '/' or '^'`, this.token.start, this.token.end));
        }

        return res;
    }

    advance () {
        const iterated = this.iterator.next();

        this.token = iterated.value;
    }

    atom () {
        const res = new ParseResult();
        const token = this.token;

        if([TT.INT, TT.FLOAT].includes(token.type)) {
            res.register(this.advance());
            return res.success(new NumberNode(token));
        } else if(token.type === TT.LPAREN) {
            res.register(this.advance());
            let expr = res.register(this.expr());
            if(res.error) return res;
            if(this.token.type === TT.RPAREN) {
                res.register(this.advance());
                return res.success(expr);
            } else {
                return res.rejected(new InvalidSyntaxError(`Expected ')'`, this.token.start, this.token.end));
            };
        }

        return res.rejected(new InvalidSyntaxError(`Expected INT, FLOAT, '+', '-' or '('`, token.start, token.end));
    }

    factor () {
        let res = new ParseResult();
        let token = this.token

        if([TT.PLUS, TT.MINUS].includes(token.type)) {
            res.register(this.advance());
            let factor = res.register(this.factor());
            if(res.error) return res;
            return res.success(new UnaryNode(token, factor));
        }

        return this.power();
    }

    power() {
        return this.createBinaryNode(this.atom.bind(this), [TT.POW], this.factor.bind(this))
    }

    expr() {
        return this.createBinaryNode(this.term.bind(this), [TT.PLUS, TT.MINUS])
    }

    term() {
        return this.createBinaryNode(this.factor.bind(this), [TT.MULT, TT.DIV])
    }

    createBinaryNode(method, array, methodB?) {
        if(!methodB) {
            methodB = method;
        }
        const res = new ParseResult();
        let left = res.register(method())

        while (array.includes(this.token.type)) {
            let operation = this.token
            res.register(this.advance());
            let right = res.register(methodB());

            if(res.error) return res;

            left = new BinaryNode(left, operation, right);
        }

        return res.success(left);
    }


}
