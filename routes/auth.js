const express = require('express');
const db = require('../models');
const router = express.Router();
const passport = require('../config/ppConfig')

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

//create a signup POST route
router.post('/signup', (req, res) =>  {
  db.users.findOrCreate({
    where: { email: req.body.email },
    defaults: {
      name: req.body.name,
      userName: req.body.userName,
      password: req.body.password,
    }
  }).then(( [user, created] ) => {
    if (created) { 
      passport.authenticate('local', {
        successRedirect: '/',
        // successFlash: 'Account created and user logged in.' 
      })(req, res) 
    } else { 
      // req.flash('error', 'Email already exists')
      res.redirect('/auth/login')
    } 
  }).catch(error => { 
    // req.flash('error', error.message)
    res.redirect('/')
  })
})

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.post('/login', passport.authenticate('local', { 
  successRedirect: '/',                                
  failureRedirect: '/auth/login',
  failureFlash: 'Invalid username or password', 
  successFlash: 'You have logged in!',          
})) 

router.get('/logout', (req, res) => {
  req.logout()
  // req.flash('success', 'You have logged out.') 
  res.redirect('/auth/login')
})

module.exports = router;
