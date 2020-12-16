const express = require('express');
const db = require('../models');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const methodOverride = require("method-override");

router.use(methodOverride("_method"));


// ============= Board Page ================

router.get("/board", isLoggedIn, (req, res) => {
    let userName = req.user.userName
    db.lists.findAll({
        where: {
            userId: req.user.id,
        }, include: [db.tasks]
    }).then( function(foundList, foundTask) {
        res.render('board', { userName: userName, foundList: foundList, foundTask: foundTask } )
    })
})

// ============= Lists ================

// Create New List
router.post('/board', (req, res) => {
    db.lists.create({
        listName: req.body.title,
        userId: req.user.id 
    }).then( function (createdList) { 
        res.redirect('/board')
    })
})

// Update List Title
router.put('/board/:id', isLoggedIn, (req, res) => {
    db.lists.update({
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
    db.lists.destroy({
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
    // console.log(req.body.addTask, "========add task=======")
    // console.log(req.user.id, "======user id======")
    // console.log(req.params.id, "======params id(list id)====")
    // console.log(req.user.userName, "======User Name====")
    db.tasks.create({
        name: req.body.addTask,
        userId: req.user.id,
        listId: req.params.id
    }).then( function () { 
        res.redirect('/board')
    })
})

// Edit task

// strike() goes here....?

router.put('/board', isLoggedIn, (req, res) => {
    // console.log(req.user.id, '=========user id=========')
    console.log(req.params.id, '=========params id=======')
    console.log(req.body, '=========req body=======')
    db.tasks.update({
        name: req.body.addTask,
    }, {
        where: {
            id: req.params.id
        }
    }).then( function(editTask) {
        res.redirect('/board')
    })
})

// Delete Task (might forego this and only use edit)
router.delete('/board/:id', isLoggedIn, (req, res) => {
    db.lists.destroy({
        where: {
            id: req.params.id,
        }
    }).then((removedList) => {
        res.redirect('/board') 
    })
})

module.exports = router;