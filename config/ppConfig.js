const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy //working with a class 
const db = require('../models')

passport.serializeUser((user, cb) => { 
  cb(null, user.id)                    
})

passport.deserializeUser((id, cb) => { //cb stands for call back variable
  db.users.findByPk(id).then(user => { 
    cb(null, user)
  }).catch(cb) //handling errors
})

passport.use(new LocalStrategy({
  usernameField: 'email',   
  passwordField: 'password',
}, (email, password, cb) => {
  db.users.findOne({                               
    where: { email }                                
  }).then (user => {                               
    if (!user || !user.validPassword(password)) {
      cb(null, user)                                
    } else {
      // console.log('-----------------HERE', user.validPassword(password))
      cb(null, user)
    }
  }).catch(cb) 
}))





module.exports = passport; 