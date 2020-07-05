const User = require('../models/user');
const formidable = require('formidable');
const _ = require('lodash');
var Jimp = require('jimp');
const { v4: uuidv4 } = require('uuid');

exports.getUserById = (req, res, next, id) => {
    User.findById(id, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User Not found in DB',
            });
        }
        req.profile = user;
        next();
    });
};

//for user to get his details
exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    req.profile.followers = req.profile.followers.length;
    req.profile.followings = req.profile.followings.length;
    return res.json(req.profile);
};

//for users to update their detail

// updatePhoto = (req, res) => {
//     let user;
//     let photoName = uuidv4();
//     let photoPath = '/assets/' + photoName + '.png';

//     let form = new formidable.IncomingForm();
//     form.keepExtensions = true;

//     form.on('file', function (name, file) {
//         // console.log(file);

//         Jimp.read(file.path, (err, lenna) => {
//             if (err) {
//                 return res.status(400).json({
//                     error: 'File Upload Error',
//                 });
//             }

//             lenna
//                 .resize(256, 256) // resize
//                 .quality(100) // set JPEG quality
//                 .write(__dirname + '/assets/' + photoName + '.png'); // save
//         });
//     });

//     form.parse(req, (err, fields, file) => {
//         if (err) {
//             return res.status(400).json({
//                 error: 'problem with image',
//             });
//         }

//         //updation code
//         user = req.profile;
//         user.profilePicPath = photoPath;
//         user = _.extend(user, fields);
//         user.save((err, user) => {
//             if (err) {
//                 res.status(400).json({
//                     error: 'Updation of user failed',
//                 });
//             }
//             res.json(user);
//         });
//     });
// };
//product listing

exports.followToggle = (req, res) => {};
// exports.getAllUsers=(req,res)=>{
//     User.find((err,user)=>{
//         if(err||!user)
//         {
//             return res.status(400).json({
//                 error:"User not found / DB error"
//             })
//         }
//         return res.json(user)
//     })
// }

//USER UPLOAD DETAILS
let user;
let photoPath;
uploading = (file, photoName, res, req) => {
    user = req.profile;

    //Checking File Extension(only jpg/jpeg/png) and Size(upto 5mb)
    if (file.path.match(/\.(jpg|jpeg|png)$/) && file.size < 5000000) {
        Jimp.read(file.path, (err, lenna) => {
            lenna
                .resize(300, 300) // resize
                .quality(100) // set JPEG quality
                .write(__dirname + '/assets/' + photoName + '.png'); // save

            console.log('Uplaoded');
        });
        console.log('Uplaoding....');
        user.profilePicPath = photoPath;
    } else {
        user.profilePicPath = null;
    }
};

//Update Profile Photo
exports.updateProfile = (req, res, next) => {
    let photoName = uuidv4();
    photoPath = '/assets/' + photoName + '.png';

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.on('file', function (name, file) {
        // console.log(file);
        uploading(file, photoName, res, req);
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

//Update User
exports.updateUser = async (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: 'problem with image',
            });
        }

        //updation code
        let user = req.profile;
        user = _.extend(user, fields);

        if (user.profilePicPath === null) {
            res.status(400).json({
                error: 'Upload Valid Image',
            });
        } else if (user.profilePicPath !== null) {
            user.save((err, user) => {
                if (err) {
                    res.status(400).json({
                        error: 'Updation of user failed',
                    });
                }
                res.json(user);
            });
        }
    });
    console.log('Done');
};
