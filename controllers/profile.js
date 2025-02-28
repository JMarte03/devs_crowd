module.exports = {
  getMyProfile: async (req, res) => {
    try {
      console.log("User in request:", req.user); 
      res.render("profile.ejs", { user: req.user });

    } catch (err) {
      console.log(err)
    }
  },
};
