const express = require("express"),
    router = express.Router(),
    TodoController = require('../controllers/todos.controller'),
    TodosService = require('../services/todos.service');

router.use(async (req, res, next) => {
    let data = await TodosService.getTodos();

    if(data){
        req.todos = data;
        next();
    }else
        return res.status(500).send({message: 'Error while getting todos'});
});

router.route('/')
    .get(TodoController.getTodos)
    .post(TodoController.createTodo)
    .put(TodoController.updateTodo)
    .delete(TodoController.deleteTodo);

module.exports = router;