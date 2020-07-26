const User = require('../models/user');
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

exports.signup = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
            param: errors.array()[0].param,
        });
    }

    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: 'NOT able to save user in DB',
            });
        }
        res.json({
            username: user.username,
            name: user.name,
            email: user.email,
            id: user._id,
        });
    });
};

exports.signin = (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
            param: errors.array()[0].param,
        });
    }

    User.findOne({ email }, (err, user) => {
        if (err) {
            return res.status(400).json({
                msg: 'DB Error',
            });
        }

        if (!user) {
            return res.status(400).json({
                msg: 'User email not found',
            });
        }

        //checking for password from DB
        if (!user.authenticate(password)) {
            return res.status(401).json({
                msg: 'Email and Password do not match',
            });
        }

        //Signin the user by
        //Create the token put it in Cookie
        //Creating Token
        const token = jwt.sign({ _id: user._id }, process.env.SECRET);
        //Put Token in Cookie
        res.cookie('token', token, { expire: new Date() + 9999 });

        //sending response to frontEnd
        const { _id, username, name, email } = user;
        return res.json({
            token,
            user: { _id, username, name, email },
        });
    });
};

exports.signout = (req, res) => {
    res.clearCookie('token');
    res.json({
        message: 'User Signout Successful',
    });
};

//Protected Routes
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: 'auth',
});

//custom MiddleWares
//req.profile is set up by frontend and also by getUserById controller
exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;

    if (!checker) {
        return res.status(403).json({
            error: 'Access Denied',
        });
    }
    next();
};
