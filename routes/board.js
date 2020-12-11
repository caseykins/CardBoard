const express = require('express');   // - express
const db = require('../models')     // - DB
const router = express.Router();      // - express router
const isLoggedIn = require('../middleware/isLoggedIn');
const methodOverride = require("method-override") // - method override

router.use(methodOverride("_method"))

//ROUTE to GET alive plants specific to user and display them on the ledger page
router.get("/", isLoggedIn, (req, res) => {
    res.render('/')
})