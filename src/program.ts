import Lexer from './classes/Lexer'

export default (file, tokens) => {

    // Generate Tokens
    const lexer = new Lexer(file, tokens);
    const result = lexer.create();


    if(result.error) return result.errorMessage.toString();

    return result.tokens

}