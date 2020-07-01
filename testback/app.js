var express = require('express');
var formidable = require('formidable');

var app = express();

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/testfront/index.html');
});

app.post('/', function (req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req);

    form.on('fileBegin', function (name, file) {
        file.path = __dirname + '/uploads/' + file.name;
    });

    form.on('file', function (name, file) {
        console.log('Uploaded ' + file.name);
    });

    res.sendFile(__dirname + '/testfront/index.html');
});

app.listen(3000);
