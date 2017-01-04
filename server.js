/**
 * Created by eugen on 12/30/16.
 */
let fs = require('fs');
let express = require('express');
let path = require('path');
let BoolCalculator = require('./BoolCalculator').BoolCalculator;

let app = express();

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.post('/calculate', (req, res) => {
    let expression = '';
    req.on('data', (chunck) => {
        expression += chunck.toString();
    });
    req.on('end', () => {
        console.log('Infix expression form:\n', expression);
        let boolCalculator = new BoolCalculator(expression);
        boolCalculator.calculateAll();
        res.send(JSON.stringify(boolCalculator.results));
    })
});

app.listen(8080, () => {
    console.log('Server is started on 8080 port');
});