var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const { signout, signup, signin, isSignedIn } = require('../controllers/auth');

router.post(
    '/signup',
    [
        check('username')
            .isLength({ min: 5 })
            .withMessage('UserName should be Min 5 characters'),
        check('name')
            .isLength({ min: 5 })
            .withMessage('Name should be Min 3 characters'),
        check('email').isEmail().withMessage('Email is Required'),
        check('password')
            .isLength({ min: 5, max: 15 })
            .withMessage('Password should be 5 Character long'),
    ],
    signup
);

router.post(
    '/signin',
    [check('email').isEmail().withMessage('Enter a Valid Email')],
    signin
);

router.get('/test', isSignedIn, (req, res) => {
    res.json(req.auth);
});

router.get('/signout', signout);

module.exports = router;
