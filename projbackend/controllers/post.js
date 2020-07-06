exports.getPostById = (req, res, next, id) => {
    Post.findById(id)
        .populate('user')
        .exec((err, post) => {
            if (err) {
                return res.status(400).json({
                    error: 'Post not found',
                });
            }
            req.post = post;
            next();
        });
};

exports.getAnotherPostById = (req, res, next, id) => {
    Post.findById(id)
        .populate('user')
        .exec((err, post) => {
            if (err) {
                return res.status(400).json({
                    error: 'Post not found',
                });
            }
            req.post = post;
            next();
        });
};

exports.getPost = (req, res) => {
    return res.json(req.post);
};

exports.getAnotherUserPost = (req, res) => {
    return res.json(req.anotherPost);
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

exports.createPost = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: 'problem with image',
            });
        }

        //updation code
        let post = req.post;
        post = _.extend(post, fields);

        if (post.picturePath === null) {
            res.status(400).json({
                error: 'Upload Valid Image',
            });
        } else if (post.postPath !== null) {
            post.save((err, post) => {
                if (err) {
                    res.status(400).json({
                        error: 'Updation of post failed',
                    });
                }
                res.json(post);
            });
        }
    });
    console.log('Done');
};
