const express = require('express');
const router = express.Router();


const { isSignedIn, isAuthenticated } = require('../controllers/auth');
//parameter extractor
router.param('userId', getUserById);






module.exports = router;