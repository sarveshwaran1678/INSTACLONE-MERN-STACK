const User = require('../models/user');
const Order = require('../models/order');
var formidable = require('formidable');
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

    return res.json(req.profile);
};

//for users to update their detail
exports.updateUser = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: 'problem with image',
            });
        }

        //handle file here
        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    error: 'File size too big!',
                });
            }
            Jimp.read(file.photo.path, (err, lenna) => {
                if (err) throw err;

                const photoName = uuidv4();
                const photoPath = __dirname + '/assets/' + photoName + '.png';

                lenna
                    .resize(256, 256) // resize
                    .quality(100) // set JPEG quality
                    .write(photoPath); // save
            });
        }

        //updation code
        req.user.profilePicPath = photoPath;
        let user = req.user;
        user = _.extend(user, fields);

        //save to the DB
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
