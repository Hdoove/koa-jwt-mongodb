const { Schema, model } = require('../../config/db');

const bookSchema = new Schema({
    name: { // 书名
        type: String,
        required: true
    },
    author: String, // 作者
    details: String, // 介绍
    price: { // 价格
        type: Number,
        required: true
    },
    press: String, // 出版社
    publishTime: String // 出版时间
});

module.exports = model('Book', bookSchema);