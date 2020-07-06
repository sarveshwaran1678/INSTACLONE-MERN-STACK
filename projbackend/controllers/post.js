exports.getPictureById = (req, res, next, id) => {
    Picture.findById(id)
        .populate('user')
        .exec((err, picture) => {
            if (err) {
                return res.status(400).json({
                    error: 'Picture not found',
                });
            }
            req.picture = picture;
            next();
        });
};

exports.getAnotherPictureById = (req, res, next, id) => {
    Picture.findById(id)
        .populate('user')
        .exec((err, picture) => {
            if (err) {
                return res.status(400).json({
                    error: 'Picture not found',
                });
            }
            req.anotherPicture = picture;
            next();
        });
};

exports.getPicture = (req, res) => {
    return res.json(req.picture);
};

exports.getAnotherUserPost = (req, res) => {
    return res.json(req.anotherPicture);
};

exports.uploadPicture = (req, res, next) => {
    let photoName = uuidv4();
    let photoPath = '/assets/' + photoName + '.png';
    let post = req.post;

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.on('file', function (name, file) {
        // console.log(file);
        //Checking File Extension(only jpg/jpeg/png) and Size(upto 5mb)
        if (file.path.match(/\.(jpg|jpeg|png)$/) && file.size < 5000000) {
            Jimp.read(file.path, (err, lenna) => {
                lenna
                    .resize(300, 300) // resize
                    .quality(100) // set JPEG quality
                    .write(__dirname + '/assets/' + photoName + '.png'); // save

                console.log('Uploaded');
            });
            console.log('Uploading....');
            post.PicPath = photoPath;
        } else {
            post.PicPath = null;
        }
    });

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: 'problem with image',
            });
        }
    });

    next();
};

exports.createPicture = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: 'problem with image',
            });
        }

        //updation code
        let picture = req.picture;
        picture = _.extend(picture, fields);

        if (picture.picturePath === null) {
            res.status(400).json({
                error: 'Upload Valid Image',
            });
        } else if (picture.picturePath !== null) {
            picture.save((err, picture) => {
                if (err) {
                    res.status(400).json({
                        error: 'Updation of picture failed',
                    });
                }
                res.json(picture);
            });
        }
    });
    console.log('Done');
};

//New
