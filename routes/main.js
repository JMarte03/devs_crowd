// Main router (index.html): listens to requests made from index.html

const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");

// Main Routes
router.get("/", homeController.getIndex); // Like when you reload the page

module.exports = router; // We export this router