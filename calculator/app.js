const userInput = document.getElementById('input-number');
const addBtn = document.getElementById('btn-add');
const subtractBtn = document.getElementById('btn-subtract');
const multiplyBtn = document.getElementById('btn-multiply');
const divideBtn = document.getElementById('btn-divide');

const currentResultOutput = document.getElementById('current-result');
const currentCalculationOutput = document.getElementById('current-calculation');

function outputResult(result, text) {
  currentResultOutput.textContent = result;
  currentCalculationOutput.textContent = text;
}



const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = []; /* you make this un initialized to start the array */

// user input field
function getUserInput() {
	return parseInt(userInput.value);
}
//generates calc log
function creatAndWriteOutput(operator, resultBeforeCalc, calcNumber) {
	const calcDescription = `${resultBeforeCalc} ${operator} ${calcNumber} `;
	outputResult(currentResult, calcDescription); 
}
function writeToLog(
	operationIdentifyer,
	prevResult,
	operationNumber,
	newResult
) {
/* 	const logEntry = {
		// this is how you make it
		operation: operationIdentifyer, //so that the array is read
		prevResult: prevResult, //in the console on the
		number: operationNumber, //browser
		result: newResult,
	};
	logEntries.push(logEntry);
	const combinedLog= logEntries.toString()
	document.getElementById('Calculation-log').textContent = combinedLog
	console.log(logEntries);
} */

const logEntry = {
	// this is how you make it
	operation: operationIdentifyer, //so that the array is read
	prevResult: prevResult, //in the console on the
	number: operationNumber, //browser
	result: newResult,
	get show() {
		var x;
		switch(this.operation){
			case "Add":
				x = "+"
				break;
			case "Subtract":
				x = "-"
				break;
			case "Multiply":
				x = "*"
				break;
			case "Divide":
				x = "/"
				break;
		}
		return this.prevResult + " " + x + " " + this.number + " = " + this.result;
	}
};
logEntries.push(logEntry);
console.log(logEntries);
let combinedLog= logEntries.toString()
//alert(logEntry.show)
document.getElementById('Calculation-log').innerHTML += logEntry.show + "<br>"
}
function calculateResult(calculationType) {
	const enteredNumber = getUserInput();

	if(
		calculationType !== 'Add'&&      // this makes it so that the 
		calculationType !== 'Subtract'&&  // code runs if only one
		calculationType !== 'Multiply'&&  // of these values return 
		calculationType !== 'Divide'|| 	  // false 
		!enteredNumber
	)/* '&&' is the And operator with booleans '||' is the Or operator */{
		return;
	}
 /* 	if(
		calculationType !== 'ADD' ||	//this makes it so that the 
		calculationType !== 'Subtract' || //code will run it ANY 
		calculationType !== 'Multiply' || //of these conditions 
		calculationType !== 'Divide'	 // return true
		
	){
		return;
	} */
	const initialResult = currentResult;
	let mathOperator;
	if (calculationType === "Add") {
		currentResult += enteredNumber;
		mathOperator = "+";
	} else if (calculationType === "Subtract") {
		currentResult -= enteredNumber;
		mathOperator = "-";
	} else if (calculationType === "Multiply") {
		currentResult *= enteredNumber;
		mathOperator = "*";
	} else if (calculationType === "Divide") {
		currentResult /= enteredNumber;
		mathOperator = "/";
	}

	creatAndWriteOutput(mathOperator, initialResult, enteredNumber);
	writeToLog(calculationType, initialResult, enteredNumber, currentResult);
}

function add() {
	calculateResult("Add");
}

function subtract() {
	calculateResult("Subtract");
}
function multiply() {
	calculateResult("Multiply");
}

function divide() {
	calculateResult("Divide");
}

addBtn.addEventListener("click", add);
subtractBtn.addEventListener("click", subtract);
multiplyBtn.addEventListener("click", multiply);
divideBtn.addEventListener("click", divide);


