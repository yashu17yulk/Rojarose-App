const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
var FCM = require('fcm-node');
const config = require('../config/imp')
const { notification } = require('../models');
var fcm = new FCM(config.FCM_SERVER_KEY);
module.exports = {
    // hash password //
    hashPasswordUsingBcrypt: async (plainTextPassword) => {
        return bcrypt.hashSync(plainTextPassword, 10);
    },

    // compare password //
    comparePasswordUsingBcrypt: async (pass, hash) => {
        return bcrypt.compare(pass, hash);
    },

    // token //
    jwtSign: async (payload) => {
        try {
            return jwt.sign(payload, config.jwtSecretKey)
        } catch (error) {
            throw error
        }
    },

    // verify token //
    jwtVerify: async function (token) {
        const key = await jwt.verify(token, config.jwtSecretKey)
        return key._id
    },

    // notification //
    sendNotification: async (payload) => {
        try {
            let message = {
                to: payload.id,
                collapse_key: 'DATING_APP',
                data: payload.msg,
                title: "aaaaaaa"
            }
            // fcm.send(message, (err) => {
                // if (err) { throw err }
                // else {
                    return message;
                // }
            // })
        } catch (error) {
            throw error
        }
    },

    // verify email //
    isEmail: (value) => {
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(value).toLowerCase());
    },

}