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

exports.updateUser = (req, res) => {
    let user;
    let photoName = uuidv4();
    let photoPath = '/assets/' + photoName + '.png';

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.on('file', function (name, file) {
        // console.log(file);

        Jimp.read(file.path, (err, lenna) => {
            if (err) {
                return res.status(400).json({
                    error: 'File Upload Error',
                });
            }
            lenna
                .resize(256, 256) // resize
                .quality(100) // set JPEG quality
                .write(__dirname + '/assets/' + photoName + '.png'); // save
        });
    });

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: 'problem with image',
            });
        }

        //updation code
        user = req.profile;
        user.profilePicPath = photoPath;
        user = _.extend(user, fields);
        user.save((err, user) => {
            if (err) {
                res.status(400).json({
                    error: 'Updation of user failed',
                });
            }
            res.json(user);
        });
    });
};
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
