const express = require('express');
const router = express.Router();

const { isSignedIn, isAuthenticated } = require('../controllers/auth');
const { getUserById } = require('../controllers/user');
const {
    getPictureById,
    getAnotherPictureById,
    uploadPost,
    removePicture,
    likePicture,
    getPicture,
    updateCaption,
    getAnotherUserPicture,
    uploadStory,
} = require('../controllers/post');

const { removeAllCommentWithReply } = require('../controllers/comment');

router.param('userId', getUserById);
router.param('pictureId', getPictureById);
router.param('anotherPictureId', getAnotherPictureById);

router.post('/picture/upload/:userId', isSignedIn, isAuthenticated, uploadPost);
router.post(
    '/picture/uploadStory/:userId',
    isSignedIn,
    isAuthenticated,
    uploadStory
);
router.delete(
    '/picture/remove/:userId/:pictureId',
    isSignedIn,
    isAuthenticated,
    removePicture,
    removeAllCommentWithReply
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
