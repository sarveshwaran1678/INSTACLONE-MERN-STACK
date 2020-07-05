const express = require('express');
const router = express.Router();

//imports
const { getUserById, updateUser, getUser, updateProfile, updatePassword } = require('../controllers/user');
const { isSignedIn, isAuthenticated } = require('../controllers/auth');

//parameter extractor
router.param('userId', getUserById);

//read user details
router.get('/user/:userId', isSignedIn, isAuthenticated, getUser);

router.put("/user/updatePassword/:userId", isSignedIn, isAuthenticated, updatePassword);

//update user details
router.put('/user/:userId', isSignedIn, isAuthenticated, updateProfile, updateUser);

module.exports = router;
