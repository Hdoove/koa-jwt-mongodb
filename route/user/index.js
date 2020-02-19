const Router = require('koa-router');
const { userLogin, userRegister, userInfo, userUpdate } = require('./controllers');

const user = new Router();

user.post('/login', userLogin);

user.post('/register', userRegister);

user.get('/userinfo', userInfo);

user.post('/update', userUpdate);

module.exports = user;