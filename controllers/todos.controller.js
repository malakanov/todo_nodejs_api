const TodosService = require('../services/todos.service');

class TodosController {
    getTodos(req, res) {
        if (req.query.position) {
            return res.status(200).send({data: req.todos[req.query.position]});
        } else if (req.query.completed) {
            const completedTodos = [];
            for (const todo in req.todos) {
                if (req.todos[todo].completed) {
                    completedTodos.push(req.todos[todo])
                }
            }
            if (completedTodos)
                return res.status(200).send({data: completedTodos});
            else
                return res.status(404).send({message: 'Completed todo not found.'});
        } else if (req.query.id) {
            const idTodo = req.todos.filter(todo => todo.id == req.query.id)
            if (idTodo)
                return res.status(200).send({data: idTodo});
            else
                return res.status(404).send({message: 'Id todo not found.'});
        } else if (!req.todos)
            return res.status(404).send({message: 'Todos not found.'});

        return res.status(200).send({data: req.todos});
    }

    async createTodo(req, res) {
        if (req.body.todo && req.body.todo.id) {
            if (req.todos.hasOwnProperty(req.body.todo.id))
                return res.status(409).send({message: 'Todo already exists.'});

            const minLength = 10;

            if (req.body.todo.title.length >= minLength) {
                req.todos[req.body.todo.id] = req.body.todo;

                let result = await TodosService.createTodo(req.todos);

                if (result)
                    return res.status(200).send(result);
                else
                    return res.status(500).send({message: 'Unable create todo.'});
            } else
                return res.status(400).send({message: 'Minimal title lenght must be 10 symbols.'});

        } else
            return res.status(400).send({message: 'Bad request.'});
    }

    async updateTodo(req, res) {
        if (req.body.todo && req.body.todo.id) {
            if (!req.todos.hasOwnProperty(req.body.todo.id))
                return res.status(404).send({message: 'Todo not found.'});

            req.todos[req.body.todo.id] = req.body.todo;

            let result = await TodosService.updateTodo(req.todos);

            if (result)
                return res.status(200).send(result);
            else
                return res.status(500).send({message: 'Unable update todo.'});
        } else
            return res.status(400).send({message: 'Bad request.'});
    }

    async deleteTodo(req, res) {
        if (req.query.id) {
            if (req.todos.hasOwnProperty(req.query.id)) {
                delete req.todos[req.query.id];

                let result = await TodosService.deleteTodo(req.todos);

                if (result)
                    return res.status(200).send(result);
                else
                    return res.status(500).send({message: 'Unable delete todo.'});
            } else
                return res.status(404).send({message: 'Todo not found.'});
        } else
            return res.status(400).send({message: 'Bad request.'});
    }
}

module.exports = new TodosController();
