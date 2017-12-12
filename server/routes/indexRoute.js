var express = require('express');
var router = express.Router();

const todoController = require('../controllers/todoController');
const Todo = require('../models/todoModel');

router.get('/', todoController.all_todos);

router.get('/:id', todoController.one_todo);

router.post('/', todoController.create_todo);

router.put('/:id', todoController.toggle_todo);

module.exports = router;
