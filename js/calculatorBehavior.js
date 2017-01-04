/**
 * Created by eugen on 1/2/17.
 */
$(document).ready(() => {
    let inputLine = $('#input-line');

    function whichCharacter(char) {
        switch (char) {
            case '\u00AC': // negation
            case '\u00B7': // conjunction
            case '\u007C': // Sheffer stroke
            case '\u002B': // disjunction
            case '\u2193': // Pierce arrow
            case '\u2295': // conclusive disjunction
            case '\u21D4': // equivalence
            case '\u21D2': // implication
                return 'operator';
            case '(':
            case ')':
                return 'bracket';
            default:
                return 'operand';
        }
    }

    // handle calculator button click
    $('a.literal, a.numeric, a.operator').on('click', (event) => {
        inputLine.html(inputLine.html() + event.target.textContent);

        inputLine.trigger($.Event('add', { length: inputLine.text().length }));

        inputLine.trigger($.Event('character', { character: event.target.textContent }));
    });

    // add characters because of keyboard typing
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

            inputLine.trigger($.Event('character', { character: String.fromCharCode(event.charCode) } ))
        }
        inputLine.trigger($.Event('add', { length: inputLine.text().length }));
    });

    // handle removing characters from expression string
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

    // handle adding characters to expression string
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

    // check if input is correct
    inputLine.on('character', (event) => {
        switch (whichCharacter(event.character)) {
            case 'operand':
                if (event.character == '\u00AC') { //negation
                    if (inputLine.text().length != 0) {
                        switch (inputLine.text()[inputLine.text().length - 1]) {
                            case '(':
                            case '':
                        }
                    }
                } else {

                }
            case 'bracket':
            case 'operator':
        }
    });

    let headers;

    // fill table head with headers
    function createTableHead(table) {
        // reset headers
        let tableHead = $('#table-head');
        tableHead.html('');

        // creating table headers
        headers = Object.keys(table[0].input).slice(2);
        let tr = document.createElement('tr');

        let indexTh = document.createElement('th');
        indexTh.innerHTML = '#';
        tr.append(indexTh);

        headers.forEach(function(header) {
            let th = document.createElement('th');
            th.innerHTML = header.toUpperCase();
            tr.append(th);
        });

        let resultTh = document.createElement('th');
        resultTh.innerHTML = 'Result';
        tr.append(resultTh);
        tableHead.append(tr);
    }

    // fill table body with value pairs
    function createTableBody(table) {
        // reset body containings
        let tableBody = $('#table-body');
        tableBody.html('');

        // displaying results
        headers = Object.keys(table[0].input).slice(2);
        let rowCount = 0;

        table.forEach(function(data) {
            let tr = document.createElement('tr');

            let indexTd = document.createElement('td');
            indexTd.innerHTML = rowCount++ + '.';
            $(tr).append(indexTd);

            headers.forEach(function(key) {
                let td = document.createElement('td');
                td.innerHTML = data.input[key];
                $(tr).append(td);
            });

            let resultTd = document.createElement('td');
            resultTd.innerHTML = data.result;

            $(tr).append(resultTd);

            tableBody.append(tr);
        });
    }

    // toggle flip animation
    function flip() {
        document.querySelector(".flip-container").classList.toggle("flip");
    }

    // submit expression and send it to server
    $('#submit-button').on('click', (event) => {
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
                console.log(table);

                flip();

                $('#expression').text(inputLine.text());

                createTableHead(table);

                createTableBody(table);

                $('.results-table').css('width', ((headers.length + 1) * 100) + 'px');
            });
    });

    // handle results table click
    $('.results-table').on('click', () => {
        flip();
    })
});