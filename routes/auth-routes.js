const express = require('express');
const router = express.Router();
const passport = require('passport');

// auth login
router.get('/login', (req, res) => {
    res.render('login', {user:req.user});
});

// auth logout
router.get('/logout', (req, res) => {
    // handle whit passport
    req.logout();
    res.redirect('/');
});

// auth by google
router.get('/google', passport.authenticate('google',{
  scope: ['profile']
}));

// Callback route for Google redirect to
router.get('/google/redirect',passport.authenticate('google'),(req, res)=>{
  // res.send(req.user);
  res.redirect('/profile/');
});

// Export of const router, for used bu "app.js"
module.exports = router;
