const User = require("../models/User");
const cloudinary = require("../middleware/cloudinary");

module.exports = {
  getMyProfile: async (req, res) => {
    try {
      console.log("User in request:", req.user); 
      console.log("User id: ", req.user.id)
      res.render("profile.ejs", { user: req.user });

    } catch (err) {
      console.log(err)
    }
  },
  editProfile: async (req, res) => {
    try {
       // Check if new files were submitted
      const avatarFile = req.files["avatar"] ? req.files["avatar"][0].path : null;
      const bannerFile = req.files["banner"] ? req.files["banner"][0].path : null;

      // Upload files to cloudinary only if they exist
      const avatar = avatarFile ? await cloudinary.uploader.upload(avatarFile) : null;
      const banner = bannerFile ? await cloudinary.uploader.upload(bannerFile) : null;

      // User object updated dinamically
      const updateFields = {
        fullName: req.body.name,
        title: req.body.title,
        country: req.body.country,
        city: req.body.city,
        bio: req.body.bio,
      };

      if (avatar) updateFields.avatar = avatar.secure_url;
      if (banner) updateFields.banner = banner.secure_url;

      await User.findOneAndUpdate({ _id: req.user.id }, updateFields);

      console.log("Profile updated!")
      res.redirect("/profile");
    } catch (err) {
      console.log(err)
    }
  }
};
