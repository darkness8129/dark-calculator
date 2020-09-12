//jQuery objects variables
const $document = $(document),
    $actionBtn = $('.action-btn'),
    $numberBtn = $('.number-btn'),
    $resultDiv = $('#result'),
    $expressionDiv = $('#expression');

//variables
let firstNum = '',
    secondNum = '',
    action = '',
    result = 0;

$document.ready(function () {
    // after loading show '0' as a result
    $resultDiv.text(result);
});

$actionBtn.on('click', function () {
    let actionValue = $(this).attr('data-action');

    switch (actionValue) {
        case 'clear':
            // clear all variables
            clearVariables();

            // clear screen
            clearScreen();

            break;
        case 'calculate':
            //division by zero 
            checkDivisionByZero();

            //get result
            getResult();

            break;
        case '-':
            //we can write -1 -2 -3... as a first number
            if (!firstNum) {
                firstNum += '-';
                $expressionDiv.text(`-`);
                //when division by zero clear result
                $resultDiv.text('0');
            }
            //we can write -1 -2 -3... as a second number
            else if (firstNum && action) {
                secondNum += '-';
                $expressionDiv.append('(-');
            }

        //no break need
        default:
            //set action
            setAction(actionValue);
    }
})

$numberBtn.on('click', function () {
    let numberValue = $(this).attr('data-number');

    //can't write a number after '='
    blockWriteNumberAfterEqual();

    // if the action is entered, then write the first number, if not - the second
    if (!action) {
        // length of the first number can not be > 10
        if (firstNum.length > 10) {
            numberValue = '';
        }

        // there can be only one '.' in the first number and after first symbol
        if (numberValue === '.') {
            if (!firstNum.includes('.') && firstNum) {
                setFirstNum(numberValue);
            }
        }
        // only one '0' at the beginning of the number
        else if (numberValue === '0') {
            if (firstNum[0] !== '0' || (firstNum[0] == '0' && firstNum[1] == '.')) {
                setFirstNum(numberValue);
            }
        }
        // 01 02 03... turns to 1 2 3
        else if (firstNum[0] === '0' && firstNum[1] !== '.') {
            firstNum = '';
            firstNum += numberValue;
            $expressionDiv.text(`${firstNum}${action}${secondNum}`);
        }
        else {
            //set first num
            setFirstNum(numberValue);
        }
    }
    else {
        // length of the second number can not be > 10
        if (secondNum.length > 10) {
            numberValue = '';
        }

        // there can be only one '.' in the second number and after first symbol
        if (numberValue === '.') {
            if (!secondNum.includes('.') && secondNum) {
                setSecondNum(numberValue);
            }
        }
        // only one '0' at the beginning of the number
        else if (numberValue === '0') {
            if (secondNum[0] !== '0' || (secondNum[0] == '0' && secondNum[1] == '.')) {
                setSecondNum(numberValue);
            }
        }
        // 01 02 03... turns to 1 2 3
        else if (secondNum[0] === '0' && secondNum[1] !== '.') {
            secondNum = '';
            secondNum += numberValue;

            $expressionDiv.text(`${firstNum}${action}${secondNum}`);
        }
        else {
            //set second num
            setSecondNum(numberValue);
        }
    }
})

// func for calculating 
const calculate = (firstNum, secondNum, action) => {
    let result;

    switch (action) {
        case '+':
            result = firstNum + secondNum;
            break;
        case '-':
            result = firstNum - secondNum;
            break;
        case '*':
            result = firstNum * secondNum;
            break;
        case '/':
            result = firstNum / secondNum;
            break;
    }

    // fixes problem of calculation of floating point numbers 
    return parseFloat(result.toPrecision(15));
}

// func for setting action
const setAction = (value) => {
    // we can write an action only if the first number is entered
    if (firstNum && firstNum !== '-' && secondNum !== '-') {
        action = value;
        secondNum = '';
        $expressionDiv.text(`${firstNum}${action}`);
    }
}

//func for setting first num
const setFirstNum = (value) => {
    firstNum += value;
    $expressionDiv.append(value);
}

//func for setting second num
const setSecondNum = (value) => {
    secondNum += value;
    $expressionDiv.append(value);
}

//func for getting result
const getResult = () => {
    // we can calculate only when the second number is entered
    if (secondNum) {
        //calculating
        result = calculate(+firstNum, +secondNum, action).toString();

        // after receiving the result, it becomes the first number
        firstNum = result;
        $resultDiv.text(result);

        // we can add only one '='
        checkOneEqual();

        //clear second number and action
        secondNum = '';
        action = '';
    }
}

//func for clearing variables
const clearVariables = () => {
    result = 0;
    firstNum = '';
    secondNum = '';
    action = '';
}

//func for clearing screen
const clearScreen = () => {
    $expressionDiv.text('');
    $resultDiv.text('0');
}

// func for checking division by zero 
const checkDivisionByZero = () => {
    if (secondNum === '0' && action === '/') {
        clearVariables();
        $resultDiv.text('Error!');
        $expressionDiv.append('=');
    }
}

// func for checking that we can add only one '='
const checkOneEqual = () => {
    if (!$expressionDiv.text().includes('=')) {
        // () when second number with -
        secondNum.indexOf('-') === -1 ? $expressionDiv.append('=') : $expressionDiv.append(')=');
    }
}

//func check that we can't write a number after '='
const blockWriteNumberAfterEqual = () => {
    if ($expressionDiv.text().includes('=')) {
        clearVariables();
        clearScreen();
    }
}