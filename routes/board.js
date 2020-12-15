const express = require('express');
const db = require('../models');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const methodOverride = require("method-override");

router.use(methodOverride("_method"));


// ============= Board Page ================

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

// ============= Lists ================

// Create New List
router.post('/board', (req, res) => {
    db.cardLists.create({
        listName: req.body.title,
        userId: req.user.id 
    }).then( function (createdList) { 
        res.redirect('/board')
    })
})

// Update List Title
router.put('/board/:id', isLoggedIn, (req, res) => {
    db.cardLists.update({
        listName: req.body.newTitle,
    }, {
        where: {
            id: req.params.id
        }
    }).then( function(changeTitle) {
        res.redirect('/board')
    })
})

// Delete List
router.delete('/board/:id', isLoggedIn, (req, res) => {
    db.cardLists.destroy({
        where: {
            id: req.params.id,
        }
    }).then((removedList) => {
        res.redirect('/board') 
    })
})

// ============== Tasks ===================


// Add a new task to list
router.post('/board/:id', (req, res) => {
    console.log(req.body.addTask, "========add task=======")
    console.log(req.user.id, "======user id======")
    console.log(req.params.id, "======params id(list id)====")
    console.log(req.user.userName, "======User Name====")
    db.cards.create({
        cardName: req.user.userName + "New Task",
        description: req.body.addTask,
        userId: req.user.id,
        cardList: req.params.id
    }).then( function (foundTask) { 
        res.redirect('/board', { foundTask: foundTask })
    })
})

// Edit task

// strike() goes here....?

// router.put('/board/:id', isLoggedIn, (req, res) => {
//     // console.log(req.user.id, '=========user id=========')
//     // console.log(req.params.id, '=========params id=======')
//     // console.log(req.body, '=========req body=======')
//     db.cards.update({
//         cardName: req.body.newTitle,
//     }, {
//         where: {
//             id: req.params.id
//         }
//     }).then( function(changeTitle) {
//         res.redirect('/board')
//     })
// })

// Delete Task (might forego this and only use edit)
// router.delete('/board/:id', isLoggedIn, (req, res) => {
//     db.cardLists.destroy({
//         where: {
//             id: req.params.id,
//         }
//     }).then((removedList) => {
//         res.redirect('/board') 
//     })
// })

module.exports = router;