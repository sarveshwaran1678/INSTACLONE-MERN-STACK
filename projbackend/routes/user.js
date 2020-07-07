const express = require('express');
const router = express.Router();

//imports
const {
    getUserById,
    getAnotherUserById,
    updateUser,
    getUser,
    getAnotherUser,
    updateProfilePhoto,
    updatePassword,
    followToggle,
    followRequestHandler,
    toggleIsPrivate,
} = require('../controllers/user');

const { isSignedIn, isAuthenticated } = require('../controllers/auth');

//parameter extractor
router.param('userId', getUserById);
router.param('anotherUserId', getAnotherUserById);

//read user details
router.get('/user/:userId', isSignedIn, isAuthenticated, getUser);
router.get('/anotherUser/:userId', getAnotherUser);

//update user details
router.put(
    '/user/updateProfilePhoto/:userId',
    isSignedIn,
    isAuthenticated,
    updateProfilePhoto
);

router.put('/user/updateUser/:userId', isSignedIn, isAuthenticated, updateUser);

//update Password
router.put(
    '/user/updatePassword/:userId',
    isSignedIn,
    isAuthenticated,
    updatePassword
);

//toggle the followers
router.put(
    '/user/follow/:userId/:anotherUserId',
    isSignedIn,
    isAuthenticated,
    followToggle
);

//pass req.body.accept=yes/no
router.put(
    '/user/followRequest/:userId/:anotherUserId',
    isSignedIn,
    isAuthenticated,
    followRequestHandler
);

//toggle IsPrivate
router.put(
    '/user/toggleIsPrivate/:userId',
    isSignedIn,
    isAuthenticated,
    toggleIsPrivate
);

module.exports = router;
