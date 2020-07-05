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
    // req.profile.followers = req.profile.followers.length;
    // req.profile.followings = req.profile.followings.length;
    return res.json(req.profile);
};

//for user to get another User details
exports.getAnotherUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    // req.profile.followers = req.profile.followers.length;
    // req.profile.followings = req.profile.followings.length;
    req.profile.followRequestPending = undefined;
    req.profile.followRequestSent = undefined;
    return res.json(req.profile);
};

exports.updatePassword = (req, res) => {
    let user = req.profile;

    let { oldPassword, newPassword } = req.body;

    if (user.authenticate(oldPassword)) {
        if (newPassword.length > 5 && newPassword.length < 15) {
            user.password = newPassword;

            user.save((err, user) => {
                if (err) {
                    return res.status(400).json({
                        error: 'Updation of password failed',
                    });
                }
                return res.status(201).json({
                    message: 'Password updated succesfully',
                });
            });
        } else {
            return res.status(400).json({
                error: 'Length of password should be >5  <15',
            });
        }
    } else {
        return res.status(400).json({
            error: "Old password didn't match",
        });
    }
};

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

//Middleware Update Profile Photo
exports.updateProfile = (req, res, next) => {
    let photoName = uuidv4();
    let photoPath = '/assets/' + photoName + '.png';
    let user = req.profile;

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
            user.profilePicPath = photoPath;
        } else {
            user.profilePicPath = null;
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
