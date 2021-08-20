import base from "prompt-sync";
import chalk from "chalk";
import program from "./program";

const prompt = base();

const repl = async () => {
    while (true) {
        let input = prompt(`${chalk.yellowBright('>')} `);
        if(input === 'exit') break;
    
        console.log(program('<STDIN>', input).toString());
    }
}

export default repl;