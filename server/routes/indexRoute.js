var express = require('express');
var router = express.Router();

const todoController = require('../controllers/todoController');
const Todo = require('../models/todoModel');

router.get('/', todoController.all_todos);

router.post('/', todoController.create_todo);
// router.route("/")
//     .post((req, res) => {
//         const newTodo = new Todo({
//             title: req.body.title,
//             isDone: false
//         })
//         newTodo.save(err => {
//             if (err) res.send(err)
//
//             res.send('Added')
//         })
//     })

module.exports = router;
