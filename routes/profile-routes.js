const router = require('express').Router();

const authCheck = (req, res, next)=>{
  if (!req.user) {
    // If user is not loggin
    res.redirect('/auth/login');
  }else {
    // Is user is loggin
    next();
  }
}

router.get('/', authCheck, (req,res)=>{
  res.render('profile',{user: req.user});
});

module.exports = router;
