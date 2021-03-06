const express = require("express");
const router = express.Router();

//imports
const {
  getUserById,
  getAnotherUserById,
  updateUser,
  getUser,
  getAnotherUser,
  updateProfilePhoto,
  updatePassword,
  followToggle,
  followRequestHandler,
  toggleIsPrivate,
  forgotPasswordMailSend,
  newPasswordSubmitted,
  updateBio,
  otpMatcher,
} = require("../controllers/user");

const { isSignedIn, isAuthenticated } = require("../controllers/auth");

//parameter extractor
router.param("userId", getUserById);
router.param("anotherUserId", getAnotherUserById);

//read user details
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.get(
  "/anotherUser/:userId/:anotherUserId",
  isSignedIn,
  isAuthenticated,
  getAnotherUser
);

//update user details
router.put(
  "/user/updateProfilePhoto/:userId",
  isSignedIn,
  isAuthenticated,
  updateProfilePhoto
);

router.put("/user/updateUser/:userId", isSignedIn, isAuthenticated, updateUser);

//update Password
router.put(
  "/user/updatePassword/:userId",
  isSignedIn,
  isAuthenticated,
  updatePassword
);

//toggle the followers
router.put(
  "/user/follow/:userId/:anotherUserId",
  isSignedIn,
  isAuthenticated,
  followToggle
);

//pass req.body.accept=yes/no
router.put(
  "/user/followRequest/:userId/:anotherUserId",
  isSignedIn,
  isAuthenticated,
  followRequestHandler
);

//toggle IsPrivate
router.put(
  "/user/toggleIsPrivate/:userId",
  isSignedIn,
  isAuthenticated,
  toggleIsPrivate
);

//update Bio
//req.body.bio required
router.put("/user/updateBio/:userId", isSignedIn, isAuthenticated, updateBio);

//For sending otp to reset password
//req.body.email
router.post("/password/sendOtp", forgotPasswordMailSend);

//matching otp user sent
//req.body.userOtp and req.body.userEmail required
router.post("/password/otpCheck", otpMatcher);

//req.body.email,newPassword,confirmNewPassword
//reset Password submission
router.put("/password/resetPassword", newPasswordSubmitted);

module.exports = router;
