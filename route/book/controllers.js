const bookModel= require('./model');

const bookAdd = async (ctx, next) => {
    let result = await bookModel.addBook(ctx.request.body);
    ctx.body = {
        result
    }
};

const bookFind = async (ctx, next) => {
    let result = await bookModel.findBook();
    ctx.body = {
        result
    }
};

const bookUpdate = async (ctx, next) => {
    let result = await bookModel.updateBook(ctx.request.body);
    ctx.body = {
        result
    }
};

const bookDelete = async (ctx, next) => {
    let result = await bookModel.deleteBook(ctx.params.id);
    ctx.body = {
        result
    }
};

module.exports = {
    bookAdd,
    bookFind,
    bookUpdate,
    bookDelete
}