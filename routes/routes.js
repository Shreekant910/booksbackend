const express = require('express');
const routes = express.Router();
const bookController = require('../controller/book.controller');


routes.get('/allbooks', bookController.getallBooks);

routes.get('/allbooks/:id',bookController.getBookId);

routes.post('/newbook',bookController.addNewBook)

routes.delete('/deletebook/:id',bookController.deleteBookId);

module.exports = routes;

