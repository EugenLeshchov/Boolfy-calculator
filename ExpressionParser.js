/**
 * Created by eugen on 12/30/16.
 */

class ExpressionParser {
    constructor(initialExpression) {
        this.initialExpression = ExpressionParser.split(initialExpression);
        this.operatorsStack = [];
        this.finalExpression = [];
        this.operands = {};
    }

    parse() {
        while (this.initialExpression.length) {
            let character = this.initialExpression.shift();
            let priority = ExpressionParser.priority(character);

            if (priority != null) {
                // if current character is an operator
                let operator = '';

                if (character != ')') {
                    // and not a closing bracket // != ')'
                    operator = this.operatorsStack.pop();

                    // extract new operations until get one with primary priority
                    while (((ExpressionParser.priority(operator) <= priority && priority != 1)
                                || (ExpressionParser.priority(operator) < priority && priority == 1))
                                && ExpressionParser.priority(operator) != null
                                && priority != 5) {
                        this.finalExpression.push(operator);
                        operator = this.operatorsStack.pop();
                    }

                    // return back last extracted operator
                    if (operator != undefined)
                        this.operatorsStack.push(operator);

                    this.operatorsStack.push(character);
                } else {
                    // if current character is closing bracket // == ')'
                    operator = this.operatorsStack.pop();

                    // obtain new operators while we don't meet an opening bracket
                    while (operator != '(') {
                        this.finalExpression.push(operator);
                        operator = this.operatorsStack.pop();
                    }
                }
            } else {
                // current character is an operand
                this.finalExpression.push(character);

                // add operand to operand list
                this.operands[character] = 0;
            }
        }

        // extract last containing operators
        while(this.operatorsStack.length) {
            this.finalExpression.push(this.operatorsStack.pop());
        }

        console.log('Postfix expression form:\n' + this.finalExpression.join(''));
    }

    static split(expression) {
        return expression
            .split('')
            .filter(function(char) {
                return char != ' ';
            })
            .map(function(char) {
                if (char == '1' || char == '0') {
                    return +char;
                }
                return char;
            });
    }

    static priority(operator) {
        switch (operator) {
            case '\u00AC': // negation
                return 1;
            case '\u00B7': // conjunction
            case '\u007C': // Sheffer stroke
                return 2;
            case '\u002B': // disjunction
            case '\u2193': // Pierce arrow
                return 3;
            case '\u2295': // conclusive disjunction
            case '\u21D4': // equivalence
            case '\u21D2': // implication
                return 4;
            case '(':
            case ')':
                return 5;
            default:
                return null;
        }
    }

    static isOperator(character) {
        let priority = ExpressionParser.priority(character);
        if (priority != 5 && priority != null) return true;
        return false;
    }
}

module.exports.ExpressionParser = ExpressionParser;