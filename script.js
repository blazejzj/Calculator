document.addEventListener("DOMContentLoaded", () => {

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
                    alert("Something went wrong");
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
    const calculateBtn = document.getElementById("calculate");
    const clearBtn = document.getElementById("clear");
    const deleteBtn = document.getElementById("delete");
    

    let num1 = "";
    let num2 = "";
    let operator = "";
    let currentNum = "";
    let pressedNum = "";

    document.querySelectorAll(".number").forEach((button => {
        button.addEventListener("click", function() {
            console.log(this.textContent);
            pressedNum = this.textContent;
            displayCurrentChar(pressedNum, true);
            currentNum += pressedNum; // assign current working number
            console.log("current num " + currentNum)
            pressedNum = "";
        })
    }))

    document.querySelectorAll(".operator").forEach((opBtn => {
        opBtn.addEventListener("click", function() {
            operator = this.textContent; // assign the operator
            displayCurrentChar(" " + operator + " ", true);

            if (num1 === "") {
                num1 = convertToNum(currentNum);
                currentNum = "";
                console.log("assigned num1 " + num1)
                
            }

            else if (num1 !== "" && currentNum !== "") {
                num2 = convertToNum(currentNum);
                currentNum = "";
                console.log("assigned num2 " + num2)
            }

        })
    }));

    calculateBtn.addEventListener("click", function() {

        if (num2 === "") {
            num2 = convertToNum(currentNum);
            console.log("assigned num2 " + num2)
        }

        displayCurrentChar(" " + this.textContent + " ", true);

        if (num1 !== "" && num2 !== "" && operator !== "") {
            let calcResult = operate(num1, num2, operator);
            result.textContent = calcResult;
            console.log("result of calc " + calcResult)
            num1 = calcResult; // work with the result from calculation before
            calcResult = "";
            result.textContent = calcResult;
            displayCurrentChar(num1, false); // show previous result
            num2 = "";
            currentNum = "";
            operator = "";
            console.log("num1 after calculation " + num1)
            console.log("num2 after calculation " + num2)
            console.log("operator after calculation " + operator)
        }
    });

    clearBtn.addEventListener("click", function() {
        clearAll();
    });

    deleteBtn.addEventListener("click", function() {
        if (currentNum.length > 0 && num1 === "") {
            currentNum = currentNum.slice(0, -1);
            displayCurrentChar(currentNum, false);
            console.log("current number after slice: " + currentNum);
        }

        else {
            currentNum = currentNum.slice(0, -1);
            console.log("current number after slice: " + currentNum);
            displayCurrentChar("", false);
            displayCurrentChar(num1, true);
            displayCurrentChar(" " + operator + " ", true)
            displayCurrentChar(" " + currentNum + " ", true);
        }

    })
});

