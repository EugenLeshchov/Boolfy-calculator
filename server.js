/**
 * Created by eugen on 12/30/16.
 */
let fs = require('fs');
let express = require('express');
// let path = require('path');
let BoolCalculator = require('./BoolCalculator').BoolCalculator;

let app = express();

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile('/index.html');
});

app.listen(8080, () => {
    console.log('Server is started on 8080 port');
});