const express = require('express');
const db = require('../models');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const methodOverride = require("method-override") // - method override

router.use(methodOverride("_method"))

//ROUTE to send user to profile page and show their user name

router.get("/board", isLoggedIn, (req, res) => {
    let userName = req.user.userName
    db.cardLists.findAll({
        where: {
            userId: req.user.id,
        }
    }).then( function(foundList) {
        res.render('board', { userName: userName, foundList: foundList } )
    })
})

// take user input on card title and append it to card
router.post('/board', (req, res) => {
    db.cardLists.create({
        listName: req.body.title,
        userId: req.user.id 
    }).then( function (createdList) { 
        res.redirect('/board')
    })
})

router.post('/board', (req, res) => {
    db.cards.create({
        listName: req.body.title,
        userId: req.user.id 
    }).then( function (createdList) { 
        res.redirect('/board')
    })
})

router.delete('/board', isLoggedIn, (req, res) => {
    console.log()
    db.cardLists.findOne({
        where: { id: req.cardList.id }
    }).then((removedList) => {
        req.user.deleteList(removedList)
        res.redirect('/board') 
    })
})

module.exports = router;