
const express = require("express"),
    router = express.Router(),
    todosRoutes = require("./todos.routes");

router.use('/todos', todosRoutes);

module.exports = router;
