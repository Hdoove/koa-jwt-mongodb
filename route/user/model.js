const { sign } = require('jsonwebtoken');
const userModel = require('./schema');
const { secret } = require('../../config/secret');

const login = (data) => {
    return new Promise((resolve, reject) => {
        userModel.find(data, (err, docs) => {
            if(err) {
                reject(err);
                return;
            }
            if(docs && docs.length) {
                const token = sign({...docs[0]}, secret, { expiresIn: '1h' });
                resolve({
                    status: 1,
                    message: '登录成功',
                    token
                });
            }else {
                resolve({
                    status: -1,
                    message: '账号或密码错误'
                });
            }
        });
    });
}

const register = (data) => {
    return new Promise((resolve, reject) => {
        userModel.find({username: data.username}, (err, docs) => {
            if(err) {
                reject(err);
                return;
            }
            if(docs && docs.length) {
                resolve({
                    status: -1,
                    message: '此账号已被注册'
                });
            }else {
                const newUser = new userModel(data);

                newUser.save((err, docs) => {
                    if(err) {
                        reject({
                            status: -1,
                            massage: '数据格式有问题'
                        });
                        return;
                    }

                    resolve({
                        status: 1,
                        message: '注册成功',
                        result: docs
                    });

                });               
            }
        });
    });
}

const getUserInfo = (_id) => {
    return new Promise((resolve, reject) => {
        userModel.find({_id}, (err, docs) => {
            if(err) {
                reject(err);
                return;
            }
            if(docs && docs.length) {
                resolve({
                    state: 1,
                    message: '获取成功',
                    result: docs[0]
                });
            }
        });
    });
}

const updateUserInfo = (data, _id) => {
    return new Promise((resolve, reject) => {
        const { role, password, username, ...others } = data;
        userModel.updateOne({_id}, others, (err, docs) => {
            if(err) {
                reject(err);
                return;
            }
            // console.log(docs);
            resolve(docs);
        });
    });
}

module.exports = {
    login,
    register,
    getUserInfo,
    updateUserInfo
}