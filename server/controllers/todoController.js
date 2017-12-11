const Todo = require('../models/todoModel');

exports.all_todos = (req, res, next) => {
    Todo.find({}, (err, todos) => {
        if (err) return err;

        res.json(todos);
    })
}

exports.create_todo = (req, res) => {
    const newTodo = new Todo({
        title: req.body.title,
        isDone: false
    })
    newTodo.save(err => {
        if (err) res.send(err)

        res.json({msg: "Addded", obj: newTodo})
    })
}