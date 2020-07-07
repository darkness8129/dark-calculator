$(document).ready(function () {
    let firstNum = '',
        secondNum = '',
        action = '',
        result = 0;

    // after loading show 0 as a result
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
            firstNum += number;
            $('#action').append(number);
            // check so that you can't write a number after '='
        } else if (!$('#action').text().includes('=')) {
            secondNum += number;
            $('#action').append(number);
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