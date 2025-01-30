// This controller serves the index.html
module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },
};
