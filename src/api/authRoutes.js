const express = require("express");
const { login, checkAuth, logOut, registerUser, loggedBefore} = require("../service/authController");

const router = express.Router();

// Signup Route
router.post('/signup', registerUser);

// Login Route 
router.post("/login", login);

// Check logged before
router.post("/init", checkAuth, loggedBefore);

//logout user
router.post('/logout', checkAuth, logOut);

module.exports = router;
