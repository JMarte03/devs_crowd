const express = require('express'); // Using express
const app = express(); // app is our express application
const mongoose = require("mongoose"); // Using mongoose
const passport = require("passport"); // Using passport
const session = require("express-session"); // Using express-session
const MongoStore = require("connect-mongo"); // Using connect-mongo
const methodOverride = require("method-override"); // Using method-override
const flash = require("express-flash"); // Using express-flash
const logger = require("morgan"); // Using morgan
const connectDB = require("./config/database"); // Importing db connection
const mainRoutes = require("./routes/main"); // router on the index.html (.ejs)

// Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

// Static Folder
app.use(express.static("public"));

//Using EJS for views
app.set("view engine", "ejs");

// Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
// app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    // store: new MongoStore({ mongooseConnection: mongoose.connection }),
    store: MongoStore.create({
      client: mongoose.connection.getClient()
    })
  })
);

// Passport middleware
app.use(passport.initialize()) // To initialize passport
app.use(passport.session()) // To make sure it integrates with session

//Use flash messages for errors, info, ect...
app.use(flash());

// Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
// app.use('/auth', googleRoutes)
// app.use("/post", postRoutes);

// Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, let's do this...");
});