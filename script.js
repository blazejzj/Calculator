document.addEventListener("DOMContentLoaded", () => {

    /*
        TODO
        - float number
        - starting negative number 
        - too many numbers - done
        - round up numbers after divide - done
        - font size with big numbers - done
    */

    function add(num1, num2) {
        return num1 + num2;
    }

    function divide(num1, num2) {
        return num1 / num2;
    }
    
    function multiply(num1, num2) {
        return num1 * num2;
    }
    
    function subtract(num1, num2) {
        return num1 - num2;
    }
    
    function operate(num1, num2, operator) {
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);
    
        switch(operator) {
            case "+":
                return add(num1, num2);
            case "-":
                return subtract(num1, num2);
            case "*":
                return multiply(num1, num2);
            case "/":
                if (num2 === 0) {alert("Can't divide by 0!")}
                else {
                    // return rounded up number
                    return Math.round(divide(num1, num2) * 100) / 100;
                }
            default:
        }
    }

    function displayCurrentChar(char, append = false) {
        if (append) {
            calculation.textContent += char;
        }
        else {
            calculation.textContent = char;
        }
        resetFontSize();
        adjustFontSize();
    }

    function convertToNum(num) {
        return parseInt(num);
    }

    function clearAll() {
        num1 = "";
        num2 = "";
        operator = "";
        currentNum = "";
        pressedNum = "";
        result.textContent = "";
        displayCurrentChar("", false);
    }

    function adjustFontSize() {
        var resultLength = result.innerText.length;
        var calculationLength = calculation.innerText.length;

        if (resultLength > 10 || calculationLength > 10) {
            result.style.fontSize = "20px"; 
            calculation.style.fontSize = "20px"; 

        } 
        else {
            result.style.fontSize = "35px"; 
            calculation.style.fontSize = "35px"; 
        }
    }
    
    function resetFontSize() {
        result.style.fontSize = "35px";
        calculation.style.fontSize = "35px";
    }

    const calculation = document.getElementById("calculation");
    const result = document.getElementById("result");
    result.textContent = "0";
    const calculateBtn = document.getElementById("calculate");
    const clearBtn = document.getElementById("clear");
    const deleteBtn = document.getElementById("delete");
    
    let num1 = "";
    let num2 = "";
    let operator = "";
    let currentNum = "";

    document.querySelectorAll(".number").forEach((button => {
        button.addEventListener("click", function() {

            if(operator === "" && num1 && !currentNum) {
                num1 = "";
                result.textContent = "0";
                displayCurrentChar("", false);
            }
            pressedNum = this.textContent;
            displayCurrentChar(pressedNum, true);
            currentNum += pressedNum; // assign current working number

            // check if pressedNum is too long  - 10 digits
            if (currentNum.length > 15) {
                alert("ERROR! Too many numbers!");
                clearAll();
            }
        })
    }))

    document.querySelectorAll(".operator").forEach((opBtn => {
        opBtn.addEventListener("click", function() {

            if (operator && num1 && currentNum) {
                num2 = convertToNum(currentNum); // if ongoing operation, compute first
                let calcResult = operate(num1, num2, operator);
                result.textContent = calcResult;
                num1 = calcResult;  // assign num1 as the result => for further calculations
                currentNum = ""; // reset current num and num2
                num2 = ""; 
            } 
            
            else if (!num1 && currentNum) {
                num1 = convertToNum(currentNum); 
                currentNum = "";
            } 

            operator = this.textContent;
            displayCurrentChar(num1 + " " + operator + " ", false);
        });
    }));

    
    calculateBtn.addEventListener("click", function() {
        if (num1 && currentNum  && operator) {
            num2 = convertToNum(currentNum); // assign num2
            let calcResult = operate(num1, num2, operator); // perform calculation
            result.textContent = calcResult; // display calculation result
            num1 = calcResult; // work with the result from calculation before
            displayCurrentChar("", false);
            num2 = "";
            currentNum = "";
            operator = "";
        }
    });

    clearBtn.addEventListener("click", clearAll);

    deleteBtn.addEventListener("click", () => {
        if (currentNum.length > 0) {
            currentNum = currentNum.slice(0, -1);
            displayCurrentChar(num1 + " " + operator + " " + currentNum, false);
        }
    });
});

