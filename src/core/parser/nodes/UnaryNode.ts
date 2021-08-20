export default class UnaryNode {
    constructor (public operation, public node) {}

    toString() {
        return `(${this.operation}, ${this.node})`
    }
}