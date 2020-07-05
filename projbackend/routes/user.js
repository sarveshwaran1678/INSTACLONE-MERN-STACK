const express = require('express');
const router = express.Router();

//imports
const {
    getUserById,
    getAnotherUserById,
    updateUser,
    getUser,
    getAnotherUser,
    updateProfile,
    updatePassword, followToggle, followRequestHandler
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

router.put(
    "/user/follow/:userId/:anotherUserId",
    isSignedIn,
    isAuthenticated,
    followToggle
);

//pass req.body.accept
router.put(
    "/user/followRequest/:userId/:anotherUserId", isSignedIn, isAuthenticated, followRequestHandler
)


module.exports = router;
