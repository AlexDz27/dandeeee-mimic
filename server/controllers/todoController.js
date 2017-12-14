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
    debugger
    console.log(req.body);
    const newTodo = new Todo({
        title: req.body.title,
        isDone: false
    })
    debugger
    newTodo.save(err => {
        if (err) res.send(err)
        debugger
        res.json({msg: "Addded", obj: newTodo})
    })
}

exports.toggle_todo = (req, res) => {
    Todo.findById(req.params.id, (err, toggledTodo) => {
        if (err) return err;

        toggledTodo.isDone = !toggledTodo.isDone;

        toggledTodo.save(err => {
            if (err) res.send(err)
        })

        res.json(toggledTodo)

        // toggledTodo.isDone = !toggledTodo.isDone

    })
}