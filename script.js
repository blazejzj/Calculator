document.addEventListener("DOMContentLoaded", () => {

    /*
        TODO
        - float number
        - starting negative number 
        - too many numbers 
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

        switch(operator) {
            case "+":
                return add(num1, num2);
            case "-":
                return subtract(num1, num2);
            case "*":
                return multiply(num1, num2);
            case "/":
                if (num2 === 0) {alert("Can't divide by 0!")}
                else {return divide(num1, num2);}
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

