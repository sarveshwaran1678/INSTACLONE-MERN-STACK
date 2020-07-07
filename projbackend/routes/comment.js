const express = require('express');
const router = express.Router();

const { isSignedIn, isAuthenticated } = require('../controllers/auth');
const { getUserById } = require('../controllers/user');
const { getPictureById } = require("../controllers/post")

router.param('userId', getUserById);
router.param('pictureId', getPictureById);

//create comment
//commentBody must come from req.body
router.post("/post/comments/:userId/:pictureId", isSignedIn, isAuthenticated, createComment)

//get all comments on a post


//get all comments by a user


//update a comment 


//delete a comment


