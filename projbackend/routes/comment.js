const express = require('express');
const router = express.Router();

const { isSignedIn, isAuthenticated } = require('../controllers/auth');
const { getUserById } = require('../controllers/user');
const { getPictureById } = require('../controllers/post');
const {
    getCommentById,
    createComment,
    getAllCommentsByPost,
    getAllCommentsByUser,
    updateComment,
    removeUserComment,
    removePostComment,
    createReply,
    getReplyById,
    updateReply,
    getAllReplyByUser,
    removeUserReply,
    removeCommentReply,
    removeReplies,
    getAllReplyByCommentId,
} = require('../controllers/comment');

router.param('userId', getUserById);
router.param('pictureId', getPictureById);
router.param('commentId', getCommentById);
router.param('replyId', getReplyById);

//create comment
//commentBody must come from req.body
router.post(
    '/comment/createComment/:userId/:pictureId',
    isSignedIn,
    isAuthenticated,
    createComment
);

//get all comments on a post
router.get(
    '/comment/getAllCommentsByPost/:userId/:pictureId',
    isSignedIn,
    isAuthenticated,
    getAllCommentsByPost
);

//get all comments by a user
router.get(
    '/comment/getAllCommentsByUser/:userId',
    isSignedIn,
    isAuthenticated,
    getAllCommentsByUser
);

//update a comment
//req.body.commentBody is must and will update comment
router.put(
    '/comment/updateComment/:userId/:commentId',
    isSignedIn,
    isAuthenticated,
    updateComment
);

//delete a comment
//remove your own comment
//will remove all its reply as well
router.delete(
    '/comment/removeUserComment/:userId/:commentId',
    isSignedIn,
    isAuthenticated,
    removeUserComment,
    removeReplies
);

//remove comment from your post
router.delete(
    '/comment/removePostComment/:pictureId/:userId/:commentId',
    isSignedIn,
    isAuthenticated,
    removePostComment,
    removeReplies
);

//have to pass req.body.replyBody
//create Reply
router.post(
    '/reply/createReply/:userId/:commentId',
    isSignedIn,
    isAuthenticated,
    createReply
);

//get all reply by a user
router.get(
    '/reply/getAllReplyByUser/:userId',
    isSignedIn,
    isAuthenticated,
    getAllReplyByUser
);

//get all reply by comment Id
router.get(
    '/reply/getAllReplyByCommentId/:userId/:commentId',
    isSignedIn,
    isAuthenticated,
    getAllReplyByCommentId
);

//update a reply
//req.body.replyBody is must and will update replyBody
router.put(
    '/reply/updateReply/:userId/:replyId',
    isSignedIn,
    isAuthenticated,
    updateReply
);

//delete reply by user

router.delete(
    '/reply/removeUserReply/:userId/:replyId',
    isSignedIn,
    isAuthenticated,
    removeUserReply
);
//delete reply on that comment Id
router.delete(
    '/reply/removeCommentReply/:userId/:commentId/:replyId',
    isSignedIn,
    isAuthenticated,
    removeCommentReply
);

module.exports = router;
