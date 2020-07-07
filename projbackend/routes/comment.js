const express = require('express');
const router = express.Router();

const { isSignedIn, isAuthenticated } = require('../controllers/auth');
const { getUserById } = require('../controllers/user');
const { getPictureById } = require("../controllers/post")
const { getCommentById, createComment, getAllCommentsByPost, getAllCommentsByUser, updateComment, removeUserComment, removePostComment } = require("../controllers/comment")

router.param('userId', getUserById);
router.param('pictureId', getPictureById);
router.param("commentId", getCommentById)

//create comment
//commentBody must come from req.body
router.post("/post/comments/:userId/:pictureId", isSignedIn, isAuthenticated, createComment)

//get all comments on a post
router.get("/post/getAllCommentsByPost/:userId/:pictureId", isSignedIn, isAuthenticated, getAllCommentsByPost)

//get all comments by a user
router.get("/post/getAllCommentsByUser/:userId/:pictureId", isSignedIn, isAuthenticated, getAllCommentsByUser)

//update a comment 
//req.body.commentBody is must and will update comment
router.put("/post/updateComment/:userId/:commentId", isSignedIn, isAuthenticated, updateComment)

//delete a comment
//remove your own comment
router.delete("/post/removeUserComment/:userId/:commentId", isSignedIn, isAuthenticated, removeUserComment)
//remove comment from your post

router.delete("/post/removePostComment/:pictureId/:userId/:commentId", isSignedIn, isAuthenticated, removePostComment)



module.exports = router;


