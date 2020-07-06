const express = require('express');
const router = express.Router();

const { getPictureById, getAnotherPictureById, createComment, getCommentById, updateComment } = require("../controllers/post")
const { isSignedIn, isAuthenticated } = require('../controllers/auth');
const { getUserById } = require("../controllers/user")

//parameter extractor
router.param('userId', getUserById);

router.param("picId", getPictureById)
router.param("anotherPicId", getAnotherPictureById)

router.param("commentId", getCommentById)

//res.body must pass commentBody with it
router.post("/comment/newComment/:userId/:picId", isSignedIn, isAuthenticated, createComment)

//read comment


//read all comment by user


//read all comments on a pic

//update comment
router.put("/comment/updateComment/:userId/:picId", isSignedIn, isAuthenticated, updateComment)

//delete comment


module.exports = router;