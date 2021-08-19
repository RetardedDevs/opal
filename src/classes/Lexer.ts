import Token from "./Token";
import { TOKEN_TYPES, OPERATORS } from '../utils/Constants'
import IllegalCharacterError from "../errors/IllegalCharacterError";
import Position from "./Position";
import BaseError from "../errors/BaseError";



export default class Lexer {
    protected token: string | null
    protected position: Position
    
    constructor (public fn: string, public content: string) {
    
        this.fn = fn;
        this.content = content.trim();
        this.token = null;
        this.position = new Position(-1, { content: '',number: 1}, 0, this.fn, this.content);

        this.advance();
    }

    /**
     * Advance to the next character
     */
    advance() {
        this.position.advance(this.token)    
        this.token = this.position.index < this.content.length ? this.content[this.position.index] : null;
    }

    /**
     * Create Tokens
     */
    create() {
        const result = {
            error: false,
            errorMessage: BaseError.prototype,
            tokens: []
        };

        while (this.token !== null) {
            if(this.token === '\r') {
                this.advance();
                continue;
            } else if(this.token === ' ') {
                this.advance();
                continue;
            } else if(OPERATORS[this.token]) {
                result.tokens.push(new Token(TOKEN_TYPES[OPERATORS[this.token]], null, this.position));
                this.advance();
                continue;
            } else if(this.token === '(') {
                result.tokens.push(new Token(TOKEN_TYPES.LPAREN, null, this.position));
                this.advance();
                continue;
            } else if(this.token === ')') {
                result.tokens.push(new Token(TOKEN_TYPES.RPAREN, null, this.position));
                this.advance();
                continue
            } else {
                let token = this.token;
                let start = this.position.copy();
                this.advance();
                result.error = true
                result.errorMessage = new IllegalCharacterError(token, start, this.position);
                return result;
            }
        }

        result.tokens.push(new Token(TOKEN_TYPES.EOF, null, this.position))


        return result;
    }
}