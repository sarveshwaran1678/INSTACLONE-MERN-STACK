const express = require('express');
const router = express.Router();

//imports
const {
    getUserById,
    updateUser,
    getUser,
    getAnotherUser,
    updateProfile,
    updatePassword,
} = require('../controllers/user');

const { isSignedIn, isAuthenticated } = require('../controllers/auth');

//parameter extractor
router.param('userId', getUserById);

//read user details
router.get('/user/:userId', isSignedIn, isAuthenticated, getUser);
router.get('/anotherUser/:userId', getAnotherUser);

//update user details
router.put(
    '/user/:userId',
    isSignedIn,
    isAuthenticated,
    updateProfile,
    updateUser
);

//update Password
router.put(
    '/user/updatePassword/:userId',
    isSignedIn,
    isAuthenticated,
    updatePassword
);

module.exports = router;
