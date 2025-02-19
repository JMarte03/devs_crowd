const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/User");

module.exports = function (passport) {
  // LOCAL STRATEGY
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email: email.toLowerCase() });
          if (!user) {
            return done(null, false, { msg: `Email ${email} not found.` });
          }
          if (!user.password) {
            return done(null, false, {
              msg: "Your account was created using a third-party provider (Google or GitHub). To log in with a password, please sign in using your provider first, then set a password in your profile settings.",
            });
          }
          user.comparePassword(password, (err, isMatch) => {
            if (err) {
              return done(err);
            }
            if (isMatch) {
              return done(null, user);
            }
            return done(null, false, { msg: "Invalid email or password." });
          });
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  // SERIALIZE USER
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // DESERIALIZE USER
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });

  // GOOGLE STRATEGY
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:2121/google/callback",
        passReqToCallback: true,
        scope: ["profile", "email"],
      },
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ email: profile.emails[0].value });

          if (user) {
            // If user exists but doesn't have a Google ID, update it
            if (!user.googleId) {
              user.googleId = profile.id;
              await user.save();
            }
          } else {
            // Create a new user if none exists
            user = new User({
              fullName: profile.displayName,
              email: profile.emails[0].value,
              googleId: profile.id,
              userName: profile.emails[0].value.split("@")[0],
            });
            await user.save();
          }

          return done(null, user);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );

  // GITHUB STRATEGY
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:2121/github/callback",
        passReqToCallback: true,
      },
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ email: profile.emails[0].value });

          if (user) {
            // If user exists but doesn't have a GitHub ID, update it
            if (!user.githubId) {
              user.githubId = profile.id;
              await user.save();
            }
          } else {
            // Create a new user if none exists
            user = new User({
              fullName: profile.displayName,
              email: profile.emails[0].value,
              githubId: profile.id,
              userName: profile.emails[0].value.split("@")[0],
            });
            await user.save();
          }

          return done(null, user);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );
};
