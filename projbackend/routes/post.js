const express = require('express');
const router = express.Router();

const { getPictureById, getAnotherPictureById } = require("../controllers/post")
const { isSignedIn, isAuthenticated } = require('../controllers/auth');

//parameter extractor
router.param('userId', getUserById);
router.param("picId", getPictureById)
router.param("anotherPicId", getAnotherPictureById)

router.post("/comment/newComment/:userId/:picId", isSignedIn, isAuthenticated,)




module.exports = router;