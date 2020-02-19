const Koa = require('koa');
const path = require('path');
const Router = require('koa-router');
const bodyparser = require('koa-bodyparser');
const jwt = require('koa-jwt');
const parameter = require("koa-parameter");
const cors = require("koa2-cors");
const static = require("koa-static");
const logger = require('koa-logger');
const bookRouter = require('./route/book');
const userRouter = require('./route/user');
const { secret } = require('./config/secret');

const app = new Koa();

app.use(bodyparser());
app.use(cors());
app.use(static(
    path.join(__dirname, './public')
));
app.use(logger());

app.use((ctx, next) => {
    return next().catch(err => {
        if (err.status === 401) {
            ctx.body = {
                code: 401,
                message: '认证失效'
            }
        }else if(err.status === 422) {
            ctx.body = {
                code: 400,
                message: '参数错误'
            }
        }
    });
});

app.use(jwt({ secret}).unless({
    path:[/^\/user\/(login|register)/, /^\/public/]
}));

const router = new Router();

router.use('/book', bookRouter.routes(), bookRouter.allowedMethods());
router.use('/user', userRouter.routes(), userRouter.allowedMethods());

app.use(router.routes(), router.allowedMethods());

parameter(app);

app.listen(3000, () => {
    console.log('连接成功');
});



