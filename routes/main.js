// Main router (index.html): listens to requests made from index.html

const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const authController = require("../controllers/auth");
const profileController = require("../controllers/profile")
const postsController = require("../controllers/posts")
const passport = require('passport')
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// Authentication renders and redirections
router.get("/", homeController.getIndex); // Like when you reload the page
router.get("/signup", authController.getSignup);
router.get("/login", authController.getLogin);
router.get('/logout', authController.logout);

// Local authentication
router.post('/signup', authController.postSignup)
router.post("/login", authController.postLogin);

// Other views
router.get("/profile", ensureAuth, profileController.getProfile);
router.get("/blog", ensureAuth, postsController.getBlog);

// Google OAuth Login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

// Google OAuth Callback
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/profile')
  }
)

// Logout
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err)
    req.session.destroy((err) => {
      if (err) console.error("Error destroying session: ", err)
      res.redirect('/')
    })
  })
})


module.exports = router; // We export this router