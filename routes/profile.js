// Profile router (profile.ejs): listens to requests made from profile.ejs

const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const profileController = require("../controllers/profile")
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", ensureAuth, profileController.getMyProfile);
router.put(
    "/editProfile", 
    upload.fields([
        { name: 'avatar', maxCount: 1 },
        { name: 'banner', maxCount: 1 }
    ]),
    profileController.editProfile
)

module.exports = router; // We export this router