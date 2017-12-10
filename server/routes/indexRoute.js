var express = require('express');
var router = express.Router();

const todoController = require('../controllers/todoController');
const Todo = require('../models/todoModel');

router.get('/', todoController.all_todos);

router.post('/', todoController.create_todo);

module.exports = router;
