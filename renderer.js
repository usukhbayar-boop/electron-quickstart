const electron = require("electron");
const { ipcRenderer } = electron;


ipcRenderer.on("img:change", (e, item) => {
    document.body.style.backgroundImage = `url('./images/${item}')`;
});

let container = document.querySelector(".container");
let table = document.querySelector(".table");
let display = document.querySelector(".display");

let result = 0;
let val1 = "";
let val2 = "";
let operator;

const init = () => {
    result = 0;
    val1 = "";
    val2 = "";
    operator = undefined;
    display.innerHTML = result;
}

const multiply = (num1, num2) => {
    return parseInt(num1)*parseInt(num2);
}


const plus = (num1, num2) => {
    return parseInt(num1) + parseInt(num2);
}


const minus = (num1, num2) => {
    return parseInt(num1) - parseInt(num2);
}

const divide = (num1, num2) => {
    return parseInt(num1)/parseInt(num2);
}

const equal = () => {
    display.innerHTML = result;
}


table.addEventListener("click", function(e) {
    var target = e.target.textContent;
    switch(target) {
        case 'X':
            operator = "multiply";
            display.innerHTML = "X";
            break;
        case '%':
            operator = "divide";
            display.innerHTML = "%";
            break;
        case '-':
            operator = "minus";
            display.innerHTML = "-";
            break;
        case '+':
            operator = "plus";
            display.innerHTML = "+";
            break;
        case '=':
            switch(operator) {
                case 'multiply':
                    result = multiply(val1, val2);
                    break;
                case 'divide':
                    result = divide(val1, val2);
                    break;
                case 'minus':
                    result = minus(val1, val2);
                    break;
                case 'plus':
                    result = plus(val1, val2);
                    break;
                default:
                    result = 0;
            }
            display.innerHTML = result;
            break;
        case 'CE':
            init();
            break;
        default:
            if(operator === undefined) {
                val1 += target;
                display.innerHTML = val1;
            } else {
                val2 += target;
                display.innerHTML = val2;
            }
    }
    
});