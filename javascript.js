
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

function addNumber(e) {
    if (e.currentTarget.textContent == "." && display.textContent.includes(".")) {
        return;
    }
    if (operator === undefined) {
        firstNumber += e.currentTarget.textContent;
        updateDisplay(firstNumber);
    } else {
        secondNumber += e.currentTarget.textContent;
        updateDisplay(secondNumber);
    }
}

function addOperator(e) {
    if (operator === undefined) {
        operator = e.currentTarget.textContent;
    } else {
        setResult();
        operator = e.currentTarget.textContent;
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
    numberButtons[i].addEventListener("click", addNumber);
}

const ac = document.querySelector("#keyAC");
ac.addEventListener("click", resetCalculator);

const operatorButtons = document.querySelectorAll(".operator");
for (let i = 0; i < operatorButtons.length; i++) {
    operatorButtons[i].addEventListener("click", addOperator);
}

const equalButton = document.querySelector("#key-equal");
equalButton.addEventListener("click", setResult);