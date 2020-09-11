let firstNum = '',
    secondNum = '',
    action = '',
    result = 0;

$(document).ready(function () {
    // after loading show '0' as a result
    $('#result').text(result);
});

$('.action-btn').on('click', function () {
    switch ($(this).attr('data-action')) {
        case 'clear':
            // clear all variables
            clearVariables();

            // clear screen
            clearScreen();
            break;
        case 'calculate':
            //division by zero 
            checkDivisionByZero();

            // we can calculate only when the second number is entered
            if (secondNum) {
                result = calculate(+firstNum, +secondNum, action).toString();

                // after receiving the result, it becomes the first number
                firstNum = result;

                $('#result').text(result);

                // we can add only one '='
                checkOneEqual();

                //clear second number and action
                secondNum = '';
                action = '';
            }
            break;
        case '-':
            //we can write -1 -2 -3... as a first number
            if (!firstNum) {
                firstNum += '-';
                $('#action').text(`-`);
                //when division by zero clear result
                $('#result').text('0');
            }
            //we can write -1 -2 -3... as a second number
            else if (firstNum && action) {
                secondNum += '-';
                $('#action').append('(-');
            }
        default:
            // we can write an action only if the first number is entered
            if (firstNum && firstNum !== '-' && secondNum !== '-') {
                action = $(this).attr('data-action');
                secondNum = '';
                $('#action').text(`${firstNum}${action}`);
            }
    }
})

$('.number-btn').on('click', function () {
    let number = $(this).attr('data-number');

    //can't write a number after '='
    if ($('#action').text().includes('=')) {
        clearVariables();
        clearScreen();
    }

    // if the action is entered, then write the first number, if not - the second
    if (!action) {
        // length of the first number can not be > 10
        if (firstNum.length > 10) {
            number = '';
        }

        // there can be only one '.' in the first number and after first symbol
        if (number === '.') {
            if (!firstNum.includes('.') && firstNum) {
                firstNum += number;
                $('#action').append(number);
            }
        }
        // only one '0' at the beginning of the number
        else if (number === '0') {
            if (firstNum[0] !== '0' || (firstNum[0] == '0' && firstNum[1] == '.')) {
                firstNum += number;
                $('#action').append(number);
            }
        }
        // 01 02 03... turns to 1 2 3
        else if (firstNum[0] === '0' && firstNum[1] !== '.') {
            firstNum = '';
            firstNum += number;
            $('#action').text(`${firstNum}${action}${secondNum}`);
        }
        else {
            firstNum += number;
            $('#action').append(number);
        }
    }
    else {
        // length of the second number can not be > 10
        if (secondNum.length > 10) {
            number = '';
        }

        // there can be only one '.' in the second number and after first symbol
        if (number === '.') {
            if (!secondNum.includes('.') && secondNum) {
                secondNum += number;
                $('#action').append(number);
            }
        }
        // only one '0' at the beginning of the number
        else if (number === '0') {
            if (secondNum[0] !== '0' || (secondNum[0] == '0' && secondNum[1] == '.')) {
                secondNum += number;
                $('#action').append(number);
            }
        }
        // 01 02 03... turns to 1 2 3
        else if (secondNum[0] === '0' && secondNum[1] !== '.') {
            secondNum = '';
            secondNum += number;

            $('#action').text(`${firstNum}${action}${secondNum}`);
        }
        else {
            secondNum += number;
            $('#action').append(number);
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

//func for clearing variables
const clearVariables = () => {
    result = 0;
    firstNum = '';
    secondNum = '';
    action = '';
}

//func for clearing screen
const clearScreen = () => {
    $('#action').text('');
    $('#result').text('0');
}

// func for checking division by zero 
const checkDivisionByZero = () => {
    if (secondNum === '0' && action === '/') {
        clearVariables();
        $('#result').text('Error!');
        $('#action').append('=');
    }
}

// func for checking that we can add only one '='
const checkOneEqual = () => {
    if (!$('#action').text().includes('=')) {
        // () when second number with -
        secondNum.indexOf('-') === -1 ? $('#action').append('=') : $('#action').append(')=');
    }
}
