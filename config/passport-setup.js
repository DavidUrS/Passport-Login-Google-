const passport = require('passport');
const googleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done)=>{
  done(null, user.id)
})

passport.deserializeUser((id, done)=>{
  User.findById(id).then((user)=>{
    done(null, user);
  });
})

// googleStrategy of passport
passport.use(new googleStrategy({
    //  Optiones of strategy, imported of "keys.js"

    // callbackURL, the url, go late of succesfull login
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
  }, (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    // callback
    // Checked of User already exists
    User.findOne({googleId:profile.id}).then((currentUser)=>{
      if (currentUser) {
        // Already exists this user
        console.log("Arleady, user exists in database "+currentUser);
        done(null, currentUser);
      }else {
        // Not exists user in db, so go to create new user
        new User({
          username: profile.displayName,
          googleId: profile.id,
          thumbnail: profile._json.image.url
        }).save().then((newUser)=>{
          console.log('New user created '+newUser);
          done(null, newUser);
        })
      }
    })
    // Here the information of client loged

  })
)
