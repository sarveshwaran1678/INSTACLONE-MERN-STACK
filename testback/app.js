var express = require('express');
var formidable = require('formidable');

const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

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
        const files = imagemin(['uploads/*.{jpg,png}'], {
            destination: 'build/images',
            plugins: [
                imageminMozjpeg({
                    quality: 50,
                }),
                imageminPngquant({
                    quality: [0.5, 0.8],
                }),
            ],
        });

        console.log('Uploaded ' + file.name);
    });

    res.sendFile(__dirname + '/testfront/index.html');
});

app.listen(3000);
