const userModel= require('./model');

const userLogin = async (ctx, next) => {
    ctx.verifyParams({
        username: { type: 'string', required: true },
        password: {type: 'string', required: true}
    });
    let result = await userModel.login(ctx.request.body);
    ctx.body = {
        result
    }
};

const userRegister = async (ctx, next) => {
    ctx.verifyParams({
        username: { type: 'string', required: true },
        password: {type: 'string', required: true}
    });
    let result = await userModel.register(ctx.request.body);
    ctx.body = {
        result
    }
};

const userInfo = async (ctx, next) => {
    const { user } = ctx.state;
    let result = await userModel.getUserInfo(user._doc._id);
    ctx.body = {
        result
    }
};

const userUpdate = async (ctx, next) => {
    const { _id } = ctx.state.user._doc;
    let result = await userModel.updateUserInfo(ctx.request.body, _id);
    ctx.body = {
        result
    }
}

module.exports = {
    userLogin,
    userRegister,
    userInfo,
    userUpdate
}