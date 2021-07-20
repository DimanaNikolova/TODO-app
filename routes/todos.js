var express = require('express')
var router = express.Router()
var db = require('../models')
var helpers = require('./helpers')

router.get('/', helpers.starter)
router.get('/:todoId', helpers.getTodos)
router.put('/:todoId', helpers.updateTodo)
router.delete('/:todoId', helpers.deleteTodo)
router.post('/', helpers.createTodo)

module.exports = router