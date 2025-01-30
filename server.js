const express = require('express'); // Using express
const app = express(); // app is our express application
const mainRoutes = require("./routes/main"); // router on the index.html (.ejs)

// Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Static Folder
app.use(express.static("public"));

//Using EJS for views
app.set("view engine", "ejs");

// Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
// app.use("/post", postRoutes);

// Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, let's do this...");
});