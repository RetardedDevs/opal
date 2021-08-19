import Lexer from './core/Lexer'
import Parser from './core/parser/Parser';

export default (file, tokens) => {

    // Generate Tokens
    const lexer = new Lexer(file, tokens);
    const result = lexer.create();


    if(result.error) return result.errorMessage.toString();

    const parser = new Parser(result.tokens);
    const ast = parser.parse();

    console.log(ast)
}