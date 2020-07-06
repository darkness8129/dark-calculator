$(document).ready(function () {
    let firstNum = '',
        secondNum = '',
        action = '',
        result = 0;

    $('.action-btn').on('click', function () {

        switch ($(this).attr('data-action')) {
            //when clear
            case 'clear':
                //очищаємо усе
                result = '';
                firstNum = '';
                secondNum = '';
                action = '';
                $('#result').text('');
                $('#action').text('');
                break;
            //when = 
            case 'calculate':
                result = calculate(+firstNum, +secondNum, action);
                // шоб перше число стало результатом
                firstNum = result;
                secondNum = '';
                $('#result').text(result);
                console.log($('action').text())
                if (!$('#action').text().includes('=')) {
                    //додає = в кінець після підрахунку
                    $('#action').append('=');
                }
                break;
            default:
                action = $(this).attr('data-action');
                //шоб було число + число = ... а не число = при обраххуванні результату
                $('#action').text(`${firstNum}${action}`);
        }
    })

    $('.number-btn').on('click', function () {
        let number = $(this).attr('data-number');

        if (!action) {
            firstNum += number;
            $('#action').append(number);
            //шоб не можна було писати число після =
        } else if (!$('#action').text().includes('=')) {
            secondNum += number;
            $('#action').append(number);
        }
    })






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

        return result;
    }

});