const { Schema, model } = require('../../config/db');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    nickName: String,
    homeTown: String,
    role: {
        type: String,
        default: 'user'
    },
    age: Number,
    sex: {
        type: String,
        enum: ['男', '女']
    },
    address: String
});

module.exports = model('User', UserSchema, 'user');