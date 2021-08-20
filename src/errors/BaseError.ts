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
        let start = Math.max(this.start.content.substring(0, this.start.index).lastIndexOf('\n'), 0)
        let end = this.start.content.substring(start + 1).indexOf('\n')
        let result = ''

        if (end < 0) {
            end = this.start.content.length;
        }

        let count = this.end.line.number - this.start.line.number + 1;

        for (let i = 0; i < count;i++) {
            const line = this.start.content.substring(start, end);
            const stColon = i === 0 ? this.start.col : 0;
            const enColon = i === count - 1 ? this.end.col : line.length - 1;

            result += line + '\n';
            result += ' '.repeat(stColon-1) + '^'.repeat(enColon - stColon);

            start = end;
            end = this.start.content.substring(start + 1).indexOf('\n');

            if (end < 0) {
                end = this.start.content.length;
            }
        }

        let error = `${chalk.red(this.name)} -> ${this.message}\n`;
        error+= `File ${this.start.fn} | Line ${this.start.line.number} | Column ${this.start.col}\n\n`;
        error+=result
      
        
        return error;
    }


}