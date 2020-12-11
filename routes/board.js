const express = require('express');   // - express
const db = require('../models')     // - DB
const router = express.Router();      // - express router
const isLoggedIn = require('../middleware/isLoggedIn');
// const methodOverride = require("method-override") // - method override

// router.use(methodOverride("_method"))

//ROUTE to send user to profile page and show their user name

router.get("/:userId", isLoggedIn, (req, res) => {
    let userName = req.user.userName
    res.render('board', { userName: userName } )
})

module.exports = router;