//search by api get call

const express = require('express');
const router = express.Router();

const { isSignedIn, isAuthenticated } = require('../controllers/auth');
const { getUserById } = require('../controllers/user');
const { getNotifications, searchUsers } = require('../controllers/navbar');

router.param('userId', getUserById);

//to get all you notification
//pass a skip count in req.body
router.get("/getNotification/:userId", isSignedIn, isAuthenticated, getNotifications)

//to get all your followings stories


//to search
//will send each stroke onChange in req.body.searchTerm
//req.body.skipCount will contain no. of times user has clicked load more
router.get("/searchUsers/:userId", isSignedIn, isAuthenticated, searchUsers)

//user feed


module.exports = router;
