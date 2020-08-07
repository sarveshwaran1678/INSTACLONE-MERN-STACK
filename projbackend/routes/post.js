const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getUserById, getAnotherUserById } = require("../controllers/user");
const {
  getPictureById,
  getAnotherPictureById,
  uploadPost,
  removePicture,
  likePicture,
  getPicture,
  updateCaption,
  getAnotherUserPicture,
  getAllYourPost,
  getAllAnotherPost,
} = require("../controllers/post");
const { getAllCommentsByPost } = require("../controllers/comment");

const { removeAllCommentWithReply } = require("../controllers/comment");

router.param("userId", getUserById);
router.param("pictureId", getPictureById);
router.param("anotherPictureId", getAnotherPictureById);
router.param("anotherUserId", getAnotherUserById);

//to Upload the  pictures
router.post("/picture/upload/:userId", isSignedIn, isAuthenticated, uploadPost);

//get your all pictures
router.get(
  "/picture/getYourAllPost/:userId",
  isSignedIn,
  isAuthenticated,
  getAllYourPost
);

//to delete a post with all it's comment and reply
router.delete(
  "/picture/remove/:userId/:pictureId",
  isSignedIn,
  isAuthenticated,
  removePicture,
  removeAllCommentWithReply
);

//to add a userId to its like array
router.put(
  "/picture/like/:userId/:pictureId",
  isSignedIn,
  isAuthenticated,
  likePicture
);

//to update Caption on a picture
//caption need to be send in req.body
router.put(
  "/picture/updateCaption/:userId/:pictureId",
  isSignedIn,
  isAuthenticated,
  updateCaption
);

//read your picture and all it's comments and
router.get(
  "/picture/getPicture/:userId/:pictureId",
  isSignedIn,
  isAuthenticated,
  getPicture
);

//to see another person picture and comments
router.get(
  "/picture/anotherPicture/:userId/:anotherUserId/:pictureId",
  isSignedIn,
  isAuthenticated,
  getAnotherUserPicture
);

//get other user all picutre
router.get(
  "/picture/getAnotherAllPost/:userId/:anotherUserId",
  isSignedIn,
  isAuthenticated,
  getAllAnotherPost
);

module.exports = router;
