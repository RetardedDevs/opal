export enum TOKEN_TYPES {
    "PLUS" = "PLUS",
    "MINUS" = "MINUS",
    "DIV" = "DIVIDE",
    "MULT" = "MULTIPLY",
    "POW" = "POWER",
    "DIGITS" = "1234567890",
    "INT" = "INT",
    "FLOAT" = "FLOAT",
    "LPAREN" = "LPAREN",
    "RPAREN" = "RPAREN",
    "EOF" = "EOF",
}

export enum OPERATORS {
    "+" = "PLUS",
    "-" = "MINUS",
    "/" = "DIV",
    "*" = "MUL",
    "^" = "POWER"
}

export enum KEYWORD {
    'DEF' = 'def',
    'FUNC' = 'func'
}

export const FACTOR_OPS: string[] = [TOKEN_TYPES.INT, TOKEN_TYPES.FLOAT]

export enum EXPR_OPS {
    "PLUS",
    "MINUS"
}

export enum TERM_OPS {
    "MULTIPLY",
    "DIVIDE"
}


export const KEYWORDS: string[] = [
    KEYWORD.DEF,
    KEYWORD.FUNC
]

