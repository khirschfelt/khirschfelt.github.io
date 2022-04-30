let runningTotal = 0;
let buffer = "0";
let previousOperator = null;

const screen = document.querySelector('.screen');

function buttonClick(value){
    if (isNaN(value)) {
        //Not a number
        handleSymbol(value);
    }
    else {
        //This is a number
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol){
    switch(symbol) {
        case 'C':
            buffer = '0';
            runningTotal =0;
            break;
        case '=':
            if (previousOperator === null) {
                // you need 2 numbers to math
                return;
            } 
            
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            break;
            
        case '+':
        case '-':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol){
    if (buffer === '0') {
        return;} //do nothing

   const intBuffer = parseInt(buffer);

   if (runningTotal === 0) {
       runningTotal = intBuffer;
   } else {
       flushOperation(intBuffer);
   }

   previousOperator = symbol;

   buffer = '0';
}


function flushOperation(intBuffer) {
    if (previousOperator === '+') {
        runningTotal += intBuffer;} 
        else if (previousOperator === '-') {
        runningTotal -= intBuffer;} 
        else if (previousOperator === '×') {
        runningTotal *= intBuffer;}
        else {runningTotal /= intBuffer;}
}
  

function handleNumber(numberString){
    if (buffer === "0") {
        buffer = numberString;
    }
    else {
        buffer += numberString;
        //string concatonation ex: "5" + "5" = "55" if no symbol is pushed
    }
}


document.querySelector('.calc-buttons')
    .addEventListener('click', function(event) {
    buttonClick(event.target.innerText);
    })

