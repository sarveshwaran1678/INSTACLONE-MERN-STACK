const express = require('express');
const router = express.Router();

const { getPictureById, getAnotherPictureById, createComment } = require("../controllers/post")
const { isSignedIn, isAuthenticated } = require('../controllers/auth');
const { getUserById } = require("../controllers/user")

//parameter extractor
router.param('userId', getUserById);
router.param("picId", getPictureById)
router.param("anotherPicId", getAnotherPictureById)


//res.body must pass commentBody with it
router.post("/comment/newComment/:userId/:picId", isSignedIn, isAuthenticated, createComment)




module.exports = router;