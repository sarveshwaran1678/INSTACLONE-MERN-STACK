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

router.get('/user/profile_pic/:userId');
router.put('/user/profile_pic/:userId');

router.get('/user/follow/:userId');

router.get('/user/:userId', isSignedIn, isAuthenticated, getUser);
router.get('/anotherUser/:userId', getAnotherUser);

router.put(
    '/user/:userId',
    isSignedIn,
    isAuthenticated,
    updateProfile,
    updateUser
);

router.put(
    '/user/updatePassword/:userId',
    isSignedIn,
    isAuthenticated,
    updatePassword
);

module.exports = router;
