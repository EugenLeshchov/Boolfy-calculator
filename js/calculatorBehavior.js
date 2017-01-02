/**
 * Created by eugen on 1/2/17.
 */
$(document).ready(() => {
    let inputLine = $('#input-line');
    let expressionLength = 0;

    $('a.literal, a.numeric, a.operator').on('click', (event) => {
        inputLine.html(inputLine.html() + event.target.textContent);
    });

    $(document).on('keyup', (event) => {
        switch (event.which) {
            case 8:
                inputLine.text(inputLine.text().slice(0, -1));
                break;
            case 32:
                inputLine.html(inputLine.html() + '&nbsp;');
                break;
        }
    }).on('keypress', (event) => {
        inputLine.html(inputLine.html() + String.fromCharCode(event.charCode));
    });

    inputLine.on()
});