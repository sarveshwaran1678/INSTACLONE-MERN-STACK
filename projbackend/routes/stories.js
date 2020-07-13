const express = require('express');
const router = express.Router();

const { isSignedIn, isAuthenticated } = require('../controllers/auth');
const { getUserById, getAnotherUserById } = require('../controllers/user');
const {
    getPictureById,
    getAnotherPictureById,
    uploadPost,
    uploadStory,
    removeStory,
    getAllYourStories,
    getAllAnotherStory,
    getAllFollowingStory,
} = require('../controllers/post');

router.param('userId', getUserById);
router.param('pictureId', getPictureById);
router.param('anotherPictureId', getAnotherPictureById);
router.param('anotherUserId', getAnotherUserById);

//to Upload the  pictures
router.post('/picture/upload/:userId', isSignedIn, isAuthenticated, uploadPost);

//to upload stories which will be removed after certain time
router.post(
    '/picture/uploadStory/:userId',
    isSignedIn,
    isAuthenticated,
    uploadStory
);

//to get all your stories
router.get(
    '/picture/getYourStories/:userId',
    isSignedIn,
    isAuthenticated,
    getAllYourStories
);

//to get all other stories(for their profile page)
router.get(
    '/picture/getAllOthersStories/:userId/:anotherUserId',
    isSignedIn,
    isAuthenticated,
    getAllAnotherStory
);

//get all followings story
router.get(
    '/picture/getAllFollowingsStories/:userId',
    isSignedIn,
    isAuthenticated,
    getAllFollowingStory
);

router.delete(
    '/picture/removeStory/:userId/:pictureId',
    isSignedIn,
    isAuthenticated,
    removeStory
);
module.exports = router;
