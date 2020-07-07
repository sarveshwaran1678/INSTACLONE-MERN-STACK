const express = require('express');
const router = express.Router();

const { isSignedIn, isAuthenticated } = require('../controllers/auth');
const { getUserById } = require('../controllers/user');
const {
    getPictureById,
    getAnotherPictureById,
    createPicture,
    removePicture,
    likePicture,
    getPicture,
    updateCaption,
    getAnotherUserPicture,
} = require('../controllers/post');

router.param('userId', getUserById);
router.param('pictureId', getPictureById);
router.param('anotherPictureId', getAnotherPictureById);

router.post(
    '/picture/create/:userId',
    isSignedIn,
    isAuthenticated,
    createPicture
);

router.delete(
    '/picture/remove/:userId/:pictureId',
    isSignedIn,
    isAuthenticated,
    removePicture
);

router.put(
    '/picture/like/:userId/:pictureId',
    isSignedIn,
    isAuthenticated,
    likePicture
);

router.put(
    '/picture/updateCaption/:userId/:pictureId',
    isSignedIn,
    isAuthenticated,
    updateCaption
);

router.get(
    '/picture/:userId/:pictureId',
    isSignedIn,
    isAuthenticated,
    getPicture
);

router.get('/anotherPicture/:anotherUserId/:pictureId', getAnotherUserPicture);

module.exports = router;
