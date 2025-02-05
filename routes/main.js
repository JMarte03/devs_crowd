// Main router (index.html): listens to requests made from index.html

const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const authController = require("../controllers/auth");
const profileController = require("../controllers/profile")
const postsController = require("../controllers/posts")
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// Main Routes
router.get("/", homeController.getIndex); // Like when you reload the page
router.get("/signup", authController.getSignup);
router.post('/signup', authController.postSignup)
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get('/logout', authController.logout);
router.get("/profile", ensureAuth, profileController.getProfile);
router.get("/blog", ensureAuth, postsController.getBlog);


module.exports = router; // We export this router