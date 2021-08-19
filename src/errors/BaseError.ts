import Position from '../core/Position';
import chalk from 'chalk'

export default class BaseError { 
    constructor (public name: string, public message: string, protected start: Position, protected end: Position) {
        this.name = name;
        this.message = message;
        this.start = start;
        this.end = end;
    }

    toString() {
        let error = `${chalk.red(this.name)} -> ${this.message}\n`;
        error+= `File ${this.start.fn} | Line ${this.start.line.number} | Column ${this.start.col}\n\n`;
        error+= this.end.line.content+'\n';
        error+= ' '.repeat(this.start.col) + '^'.repeat(Number(this.end.col));
        return error;
    }


}