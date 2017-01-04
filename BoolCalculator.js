/**
 * Created by eugen on 12/30/16.
 */
let ExpressionParser = require('./ExpressionParser').ExpressionParser;
class BoolCalculator extends ExpressionParser {
    constructor(expression) {
        super(expression);
        super.parse();

        delete this.operands[0];
        delete this.operands[1];

        this.operandsKeys = Object.keys(this.operands);

        this.operands[0] = 0;
        this.operands[1] = 1;

        this.results = [];
    }

    // generate sets of values for computing and do so
    calculateAll (operandIndex = 0) {
        if (operandIndex < this.operandsKeys.length) {
            [0, 1].forEach(function(value) {
                this.operands[this.operandsKeys[operandIndex]] = value;
                this.calculateAll(operandIndex + 1);
            }, this)
        } else {
            this.results.push({
                input: Object.assign({}, this.operands),
                result: this.calculate()
            });
        }
    }

    // insert values and calculate results
    calculate() {
        let finalExpression = this.finalExpression.slice();
        let operatorIndex = 0;

        while (finalExpression.length > 1) {
            let temp;
            operatorIndex = (temp = finalExpression.slice(operatorIndex + 1)).findIndex(BoolCalculator.isOperator) + operatorIndex + 1;

            if (operatorIndex != -1) {
                let operatorFunction = BoolCalculator.inspectOperator(finalExpression[operatorIndex]);

                if (operatorFunction == BoolCalculator.negation && operatorIndex >= 1) {
                    let arg = finalExpression.splice(operatorIndex - 1, 2)[0];
                    finalExpression.splice(operatorIndex - 1, 0, operatorFunction(this.operands[arg]));
                } else if (operatorIndex >= 2) {
                    let args = finalExpression.splice(operatorIndex - 2, 3);
                    finalExpression.splice(operatorIndex - 2, 0, operatorFunction(this.operands[args[0]], this.operands[args[1]]));
                } else {
                    continue;
                }
                operatorIndex = 0;
            } else {
                return null;
            }
        }
        return finalExpression[0];
    }

    // determine which operation must be evoked
    static inspectOperator(operator) {
        switch (operator) {
            case '\u00AC': // negation
                return BoolCalculator.negation;
            case '\u00B7': // conjunction
                return BoolCalculator.conjunction;
            case '\u007C': // Sheffer stroke
                return BoolCalculator.ShefferStroke;
            case '\u002B': // disjunction
                return BoolCalculator.disjunction;
            case '\u2193': // Pierce arrow
                return BoolCalculator.PierceArrow;
            case '\u2295': // exclusive disjunction
                return BoolCalculator.exclusiveDisjunction;
            case '\u21D4': // equivalence
                return BoolCalculator.equivalence;
            case '\u21D2': // implication
                return BoolCalculator.implication;
            default:
                return null;
        }
    }

    // Boolean ariphmetic functions
    static implication(firstOperand, secondOperand) {
        if (firstOperand == 1 && secondOperand == 0) return 0;
        return 1;
    }

    static equivalence(firstOperand, secondOperand) {
        if (firstOperand == secondOperand) return 1;
        return 0;
    }

    static negation(operand) {
        return (operand + 1) % 2;
    }

    static conjunction(firstOperand, secondOperand) {
        if (firstOperand == 1 && secondOperand == 1) return 1;
        return 0;
    }

    static disjunction(firstOperand, secondOperand) {
        if (firstOperand == 0 && secondOperand == 0) return 0;
        return 1;
    }

    static exclusiveDisjunction(firstOperand, secondOperand) {
        if (firstOperand != secondOperand) return 1;
        return 0;
    }

    static ShefferStroke(firstOperand, secondOperand) {
        return BoolCalculator.negation(BoolCalculator.conjunction(firstOperand, secondOperand));
    }

    static PierceArrow(firstOperand, secondOperand) {
        return BoolCalculator.negation(BoolCalculator.disjunction(firstOperand, secondOperand));
    }
}

module.exports.BoolCalculator = BoolCalculator;