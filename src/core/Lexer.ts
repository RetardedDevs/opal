import Token from "./Token";
import { TOKEN_TYPES, OPERATORS } from '../utils/Constants'
import IllegalCharacterError from "../errors/IllegalCharacterError";
import Position from "./Position";
import BaseError from "../errors/BaseError";
import { Result } from "../interfaces";

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
        const result: Result = {
            error: false,
            tokens: []
        };

        while (this.token !== null) {
            switch(this.token) {
                
                case '\r':
                    this.advance();
                    
                    continue;
                
                case  ' ':
                    this.advance();

                    continue;

                case '(':
                    result.tokens.push(new Token(TOKEN_TYPES.LPAREN, null, this.position));
                    
                    this.advance();
                    
                    continue;

                case ')':
                    result.tokens.push(new Token(TOKEN_TYPES.RPAREN, null, this.position));

                    this.advance();

                    continue;

                default:
                    const token = this.token;

                    if(TOKEN_TYPES.DIGITS.includes(token)) {
                        result.tokens.push(this.createNumber());
                        
                        continue;
                    } else if(OPERATORS[token]) {
                        result.tokens.push(new Token(TOKEN_TYPES[OPERATORS[token]], null, this.position));
                      
                        this.advance();
                      
                        continue;
                    } else {
                        let start = this.position.copy();

                        this.advance();

                        result.error = true;

                        result.errorMessage = new IllegalCharacterError(token, start, this.position);

                        return result;
                    }
            }
        }

        result.tokens.push(new Token(TOKEN_TYPES.EOF, null, this.position))


        return result;
    }

    createNumber() {
        let int = '';
        let dots = 0;
        let digits = TOKEN_TYPES.DIGITS + '.';
        let start = this.position.copy();

        while (this.token !== null && digits.includes(this.token)) {
            if(this.token === '.') {
                if(dots === 1) break;
                dots++;
                int += this.token
            } else {
                int += this.token
            }

            this.advance();
        }
        

        if(dots === 0) {
            return new Token(TOKEN_TYPES.INT, Number(int), start, this.position);
        } else return new Token(TOKEN_TYPES.FLOAT, parseFloat(int), start, this.position);
    }
}