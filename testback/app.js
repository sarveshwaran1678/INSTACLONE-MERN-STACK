var express = require('express');
var formidable = require('formidable');
var Jimp = require('jimp');
const { v4: uuidv4 } = require('uuid');

var app = express();

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/testfront/index.html');
    //res.sendFile('../testfront/public/index.html');
});

app.post('/', function (req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req);

    //Editting the uploaded file
    form.on('file', function (name, file) {
        Jimp.read(file.path, (err, lenna) => {
            if (err) throw err;
            lenna
                .resize(256, 256) // resize
                .quality(100) // set JPEG quality
                .write(__dirname + '/uploads/' + uuidv4() + '.png'); // save
        });
        // const files = imagemin(['uploads/*.{jpg,png}'], {
        //     destination: 'build/images',
        //     plugins: [
        //         imageminMozjpeg({
        //             quality: 50,
        //         }),
        //         imageminPngquant({
        //             quality: [0.5, 0.8],
        //         }),
        //     ],
        // });

        console.log('Uploaded ' + file.name);
    });

    res.sendFile(__dirname + '/testfront/index.html');
    //res.sendFile('../testfront/public/index.html');
});

app.listen(8000);
