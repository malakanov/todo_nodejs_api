const fs = require('fs');

class TodosService{
    getTodos(){
        return new Promise((res, rej) => {
            fs.readFile('data.json', (err, data) => {
                if(err) {
                    return res(false);
                }
                return res(JSON.parse(data));
            });
        });
    }

    createTodo(data){
        return new Promise((res, rej) => {
            fs.writeFile('data.json', JSON.stringify(data), (err, response) => {
                if(err)
                    return res(false);

                return res({message: 'Todo created.'});
            });
        });
    }

    updateTodo(data){
        return new Promise((res, rej) => {
            fs.writeFile('data.json', JSON.stringify(data), (err, response) => {
                if(err)
                    return res(false);

                return res({message: 'Todo updated.'});
            });
        });
    }

    deleteTodo(data){
        return new Promise((res, rej) => {
            fs.writeFile('data.json', JSON.stringify(data), (err, response) => {
                if(err)
                    return res(false);

                return res({message: 'Todo deleted.'});
            });
        });
    }
}

module.exports = new TodosService();