var db = require('../models')

exports.starter = function(req, res){
    db.Todo.find()
    .then(function(data){
        res.json(data)
    })
}

exports.getTodos = function (req, res){
    db.Todo.findById(req.params.todoId)
    .then(function(todo){
        res.json(todo)
    })
    .catch(function (err){
        res.send(err)
    })
}

exports.createTodo = function(req, res){
    db.Todo.create(req.body)
    .then(function (created){
        res.json(created)
    })
    .catch(function (err){
        res.send(err)
    })
}

exports.updateTodo = function(req, res){
    db.Todo.findOneAndUpdate({
        _id: req.params.todoId
    }, req.body, {new: true})
    .then(function(todo){
        res.json(todo)
    })
    .catch(function (err){
        res.send(err)
    })
}

exports.deleteTodo = function(req, res){
    db.Todo.findByIdAndDelete(req.params.todoId)
    .then(function(todo){
        res.json({message: 'Deleted!'})
    })
    .catch(function (err){
        res.send(err)
    })
}

module.exports = exports