//鉴权用中间件
module.exports = () => {
    return async (ctx, next) => {

        const { user } = ctx.state;

        //判断是不是admin用户
        if(user._doc.role === 'admin') {
            await next();
        }else {
            ctx.body = {
                message: '此账号尚未拥有此项权限',
                code: -1
            }
        }
    }
}