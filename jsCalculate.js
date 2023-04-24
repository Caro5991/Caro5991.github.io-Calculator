
let trailingResult = 0;
let operationsOptions = ['divide', 'multiply', 'subtract', 'add'];
let workingOperation = "";

function updateDisplay(input) {

    let display = document.getElementById("display");
    let secondaryDisplay = document.getElementById("secondaryDisplay");

    if (display.innerHTML === "0" && operationsOptions.indexOf(input) === -1) {
        if(input === "decimal") {
            display.innerHTML = "0.";
        } else if(input === "negative-value") {
            if(display.innerHTML.indexOf("-1") === -1) {
                display.innerHTML = "-" + display.innerHTML
            } else if (display.innerHTML.indexOf("-1" > -1)) {
                display.innerHTML = display.innerHTML.slice(1, display.innerHTML.length);
            }
        } else {
            display.innerHTML = input;
        }
    } else if(operationsOptions.indexOf(input) >= 0) {
        //console.log("Dealing with an operation");

        let lastOperator = "";
        let lastInput = display.innerHTML.slice(-1);
        if (operationsOptions.indexOf(lastInput) >= 0 && lastInput !== "-") {
            // Two or more operators pressed consecutively
            workingOperation = input;
        } else if(workingOperation === "") {
            // Without an initial operand
            workingOperation = input;
            trailingResult = display.innerHTML;
            secondaryDisplay.innerHTML = trailingResult;
            display.innerHTML = 0;
        }  else {
            // With a set operand
            //console.log(display.innerHTML, " Dealing with set operand");
            trailingResult = calculate(trailingResult, display.innerHTML, workingOperation);
            secondaryDisplay.innerHTML = trailingResult;
            display.innerHTML = 0;
            workingOperation = input;
        }

    } else if(input === "equals") {
        if (workingOperation !== "") {
            display.innerHTML = calculate(trailingResult, display.innerHTML, workingOperation);
            trailingResult = 0;
            workingOperation = "";
            secondaryDisplay.innerHTML = trailingResult;
        }
    } else if(input === "decimal") {
        //console.log("decimal clicked");
        if(display.innerHTML.indexOf(".") === -1) {
            display.innerHTML += ".";
        }
        //console.log("decimal skipped because already missed in number.")
    } else if(input === "negative-value") {
        //console.log("negative-value selected");
        if(display.innerHTML.indexOf("-1") === -1) {
            display.innerHTML = "-" + display.innerHTML
        } else if (display.innerHTML.indexOf("-1" > -1)) {
            display.innerHTML = display.innerHTML.slice(1, display.innerHTML.length);
        }
    } else {
        display.innerHTML += input;
    }
    //console.log(trailingResult, " <= trailingResult", display.innerHTML, " <= display.innerHTML", workingOperation, " <= workingOperation");
}


function clearDisplay() {
    let display = document.getElementById("display");
    let secondaryDisplay = document.getElementById("secondaryDisplay");
    trailingResult = 0;
    display.innerHTML = 0;
    secondaryDisplay.innerHTML = trailingResult;
}
function calculate(firstNumber, secondNumber, operation) {
    let result;
    firstNumber = parseFloat(firstNumber);
    secondNumber = parseFloat(secondNumber);
    switch(operation) {
    case "add":
        //console.log("add calculated")
        result = firstNumber + secondNumber;
        break;
    case "subtract":
        //console.log("subtract calculated")
        result = firstNumber - secondNumber;
        break;
    case "multiply":
        //console.log("multiply calculated")
        result = firstNumber * secondNumber;
        break;
    case "divide":
        //console.log("divide calculated")
        result = firstNumber / secondNumber;
        break;
    default:
        console.log("Calculate switch statement missed something");
    }
    return result.toString();
}