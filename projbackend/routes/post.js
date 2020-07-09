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
const { getAllCommentsByPost } = require('../controllers/comment');

const { removeAllCommentWithReply } = require('../controllers/comment');

router.param('userId', getUserById);
router.param('pictureId', getPictureById);
router.param('anotherPictureId', getAnotherPictureById);

//to Upload the  pictures
router.post(
    '/picture/upload/:userId',
    isSignedIn,
    isAuthenticated,
    uploadPost
);

//to upload stories which will be removed after certain time
router.post(
    '/picture/uploadStory/:userId',
    isSignedIn,
    isAuthenticated,
    uploadStory
);

//to delete a post with all it's comment and reply
router.delete(
    '/picture/remove/:userId/:pictureId',
    isSignedIn,
    isAuthenticated,
    removePicture,
    removeAllCommentWithReply
);

//to add a userId to its like array
router.put(
    '/picture/like/:userId/:pictureId',
    isSignedIn,
    isAuthenticated,
    likePicture
);

//to update Caption on a picture
//caption need to be send in req.body
router.put(
    '/picture/updateCaption/:userId/:pictureId',
    isSignedIn,
    isAuthenticated,
    updateCaption
);

//read your picture and all it's comments and 
router.get(
    '/picture/:userId/:pictureId',
    isSignedIn,
    isAuthenticated,
    getPicture,
    getAllCommentsByPost
);

//to see another person picture and comments
router.get(
    '/anotherPicture/:userId/:anotherUserId/:pictureId',
    isSignedIn,
    isAuthenticated,
    getAnotherUserPicture,
    getAllCommentsByPost
);


//get other user all pictures


//get your all pictures
module.exports = router;
