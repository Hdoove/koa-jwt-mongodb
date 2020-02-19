const bookModel = require('./schema');

const addBook = (data) => {

    return new Promise((resolve, reject) => {
        const book = new bookModel(data);

        book.save((err, result) => {
            if (err) return reject({ status: -1, message: "添加图书失败" });
            resolve({
                status: 1,
                result
            });
        });
    });
}

const findBook = () => {

    return new Promise((resolve, reject) => {
        bookModel.find({}, (err, docs) => {
            if(err) return reject({status: -1, message: "获取图书失败"});

            resolve({
                status: 1,
                docs
            });
        })
    });
}

const updateBook = (data) => {

    return new Promise((resolve, reject) => {

        const { _id, ...others } = data;

        bookModel.updateOne({_id}, {...others}, (err, docs) => {
            if(err) return reject({status: -1, message: "修改图书失败"});

            resolve({
                status: 1,
                docs
            });
        });
    });
}

const deleteBook = (_id) => {

    return new Promise((resolve, reject) => {

        bookModel.deleteOne({_id}, (err, docs) => {
            if(err) return reject({status: -1, message: "删除图书失败"});

            resolve({
                status: 1,
                docs
            });
        });
    });
}

module.exports = {
    addBook,
    findBook,
    updateBook,
    deleteBook
}