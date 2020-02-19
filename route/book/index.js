const Router = require('koa-router');
const admin = require('../../middleware/isAdmin')();
const { bookAdd, bookFind, bookUpdate, bookDelete } = require('./controllers');

const book = new Router();

book.get('/find', bookFind);

book.post('/add', admin, bookAdd);

book.post('/update', admin, bookUpdate);

book.get('/delete/:id', admin, bookDelete)

module.exports = book;