const express = require('express');
const router = express.Router();

//imports
const { getUserById, updateUser, getUser } = require('../controllers/user');
const { isSignedIn, isAuthenticated } = require('../controllers/auth');

//parameter extractor
router.param('userId', getUserById);

router.get('/user/profile_pic/:userId');
router.put('/user/profile_pic/:userId');

router.get('/user/follow/:userId');

router.get('/user/:userId', isSignedIn, isAuthenticated, getUser); //make sure to use userId only as it is a fixed parameter that accepts getUserByID
router.put('/user/:userId', isSignedIn, isAuthenticated, updateUser);

module.exports = router;
