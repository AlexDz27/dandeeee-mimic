const Todo = require('../models/todoModel');

exports.all_todos = (req, res, next) => {
    Todo.find({}, (err, todos) => {
        if (err) return err;

        res.json(todos);
    })
}

exports.one_todo = (req, res, next) => {
    Todo.findById(req.params.id, (err, oneTodo) => {
        if (err) return err;

        res.json(oneTodo);
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

exports.toggle_todo = (req, res) => {
    Todo.findById(req.params.id, (err, toggledTodo) => {
        if (err) return err;

        toggledTodo.isDone = !toggledTodo.isDone
        toggledTodo.save(err => {
            if (err) res.send(err)

            console.log({msg: "Updated", obj: toggledTodo})
        })
    })
}