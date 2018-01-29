const express = require('express');
const app = express();
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

// set up view engine
app.set('view engine', 'ejs');

// Cookie Session
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
  })
)

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Home route
app.get('/', (req, res) => {
    res.render('home',{user: req.user});
});

// Connect to mongodb
mongoose.connect(keys.mongodb.dbURL,()=>{
  console.log("Connected to mongodb using mLab");
});

// Set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

//  Setup server
app.listen(3000, () => {
    console.log('App listening on port 3000!');
});
