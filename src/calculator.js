$(document).ready(function () {
    let firstNum = '',
        secondNum = '',
        action = '',
        result = 0;

    // after loading show '0' as a result
    $('#result').text(result);

    $('.action-btn').on('click', function () {
        switch ($(this).attr('data-action')) {
            case 'clear':
                // clear all variables
                result = 0;
                firstNum = '';
                secondNum = '';
                action = '';
                $('#result').text(result);
                $('#action').text('');
                break;
            case 'calculate':
                // we can calculate only when the second number is entered
                if (secondNum) {
                    result = calculate(+firstNum, +secondNum, action);

                    // after receiving the result, it becomes the first number
                    firstNum = result;

                    console.log(String(result).length)

                    secondNum = '';
                    $('#result').text(result);

                    // we can add only one '='
                    if (!$('#action').text().includes('=')) {
                        $('#action').append('=');
                    }
                }
                break;
            default:
                // we can write an action only if the first number is entered
                if (firstNum) {
                    action = $(this).attr('data-action');
                    $('#action').text(`${firstNum}${action}`);
                }
        }
    })

    $('.number-btn').on('click', function () {
        let number = $(this).attr('data-number');

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
                // only one '0' at the beginning of the number
            } else if (number === '0') {
                if (firstNum[0] !== '0') {
                    firstNum += number;
                    $('#action').append(number);
                }
                // 01 02 03... turns to 1 2 3
            } else if (firstNum[0] === '0' && firstNum[1] !== '.') {
                firstNum = '';
                firstNum += number;
                $('#action').text(number);
            } else {
                firstNum += number;
                $('#action').append(number);
            }



            // check so that you can't write a number after '='
        } else if (!$('#action').text().includes('=')) {
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
                // only one '0' at the beginning of the number
            } else if (number === '0') {
                if (secondNum[0] !== '0') {
                    secondNum += number;
                    $('#action').append(number);
                }
                // 01 02 03... turns to 1 2 3
            } else if (secondNum[0] === '0' && secondNum[1] !== '.') {
                secondNum = '';
                secondNum += number;
                $('#action').text(`${firstNum}${action}${secondNum}`);
            } else {
                secondNum += number;
                $('#action').append(number);
            }
        }
    })

    // func for calculating 
    function calculate(firstNum, secondNum, action) {
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
});