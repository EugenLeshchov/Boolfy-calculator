/**
 * Created by eugen on 1/2/17.
 */
$(document).ready(() => {
    let inputLine = $('#input-line');
    let expressionLength = 0;

    $('a.literal, a.numeric, a.operator').on('click', (event) => {
        inputLine.html(inputLine.html() + event.target.textContent);
        inputLine.trigger($.Event('add', { length: inputLine.text().length }));
    });

    $(document).on('keyup', (event) => {
        switch (event.which) {
            case 8:
                inputLine.text(inputLine.text().slice(0, -1));
                inputLine.trigger($.Event('cut', { length: inputLine.text().length }));
                break;
            case 32:
                inputLine.html(inputLine.html() + '&nbsp;');
                inputLine.trigger($.Event('add', { length: inputLine.text().length }));
                break;
        }
    }).on('keypress', (event) => {
        if (event.charCode != 32) {
            inputLine.html(inputLine.html() + String.fromCharCode(event.charCode));
        }
        inputLine.trigger($.Event('add', { length: inputLine.text().length }));
    });

    inputLine.on('cut', (event) => {
        switch (event.length) {
            case 11:
                inputLine.css('font-size', '100%');
                break;
            case 15:
                inputLine.css('font-size', '85%');
                break;
            case 18:
                inputLine.css('font-size', '70%');
                break;
            case 22:
                inputLine.css('font-size', '60%');
                break;
            case 26:
                inputLine.css('font-size', '50%');
                break;
        }
    });

    inputLine.on('add', (event) => {
        switch (event.length) {
            case 12:
                inputLine.css('font-size', '85%');
                break;
            case 16:
                inputLine.css('font-size', '70%');
                break;
            case 19:
                inputLine.css('font-size', '60%');
                break;
            case 23:
                inputLine.css('font-size', '50%');
                break;
            case 27:
                inputLine.css('font-size', '45%');
                break;
            case 30:
                inputLine.text(inputLine.text().slice(0, -1));
                break;
        }
    });

    let submitButton = $('#submit-button');

    // submit expression and send it to server
    submitButton.on('click', (event) => {
        let expression = inputLine.text();

        // making ajax request
        let calculate = fetch('/calculate', {
            method: 'POST',
            body: expression
        });

        // handling received results
        calculate
            .then(function(response) {
                console.log(response.status);

                return response.json();
            })
            .then(function(table) {

            });
    });
});