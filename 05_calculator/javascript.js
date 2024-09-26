
// Basic math functions
function add(a, b) {
    return +a + +b;
}

function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

let firstNumber = "";
let secondNumber = "";
let operator;
const display = document.querySelector("#results");

function operate(a, b, operator) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return substract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    }
}

function setResult() {
    if (firstNumber === "" || secondNumber === "" || operator === undefined) {
        return;
    }
    if (+secondNumber == 0 && operator === "/") {
        updateDisplay("nooope");
        return;
    }
    result = operate(firstNumber, secondNumber, operator);
    updateDisplay(result);
    firstNumber = result;
    secondNumber = "";
    operator = undefined;
}

// Added this function to be able to call the addNumber from a keyboard event
function eventAddNumber(e) {
    addNumber(e.currentTarget.textContent)
}

function addNumber(num) {
    if (num == "." && display.textContent.includes(".")) {
        return;
    }
    if (operator === undefined) {
        firstNumber += num;
        updateDisplay(firstNumber);
    } else {
        secondNumber += num;
        updateDisplay(secondNumber);
    }
}

// Added this function to be able to call the addOperator from a keyboard event
function eventAddOperator(e) {
    addOperator(e.currentTarget.textContent)
}

function addOperator(ope) {
    if (operator === undefined) {
        operator = ope;
    } else {
        setResult();
        operator = ope;
    }
}

function updateDisplay(text) {
    display.textContent = text;
}

function resetCalculator() {
    updateDisplay("result");
    firstNumber = "";
    secondNumber = "";
    operator = undefined;
}

// Create the event listeners
const numberButtons = document.querySelectorAll(".number, #key-dot");
for (let i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener("click", eventAddNumber);
}

const ac = document.querySelector("#keyAC");
ac.addEventListener("click", resetCalculator);

const operatorButtons = document.querySelectorAll(".operator");
for (let i = 0; i < operatorButtons.length; i++) {
    operatorButtons[i].addEventListener("click", eventAddOperator);
}

const equalButton = document.querySelector("#key-equal");
equalButton.addEventListener("click", setResult);


document.addEventListener("keydown", addFromKey)

function addFromKey(e) {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const operators = ["/", "*", "-", "+"]
    if (numbers.includes(parseInt(e.key))) {
        addNumber(e.key)
    } else if (operators.includes(e.key)) {
        addOperator(e.key)       
    } else if (e.key === "=" || e.key === "Enter") {
        setResult()        
    }
}