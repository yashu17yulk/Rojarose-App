const Models = require('../../models/index');
// const moment         = require('moment');
// const mongoose       = require('mongoose');
// const jwt            = require('jsonwebtoken')
const messages = require('../../messages/messages')
const Utility = require('../../utility/Utility');

async function generatePhoneOtp() {
    let otp = Math.floor(100000 + Math.random() * 900000)
    return otp;
};




async function verifyOtp(data) {
    const isVerified = await Models.otp.findOne({ phone: data.phone, code: data.code });
    if (!isVerified) {
        throw messages.MESSAGES.INCORRECT_OTP
    }
    let user = await Models.user.findOneAndUpdate({ phone: data.phone }, { isPhoneVerify: true }, { new: true });
    let dataToSend = await Utility.jwtSign({ _id: user._id })
    await Models.otp.deleteMany({ phone: data.phone })
    return { token: dataToSend, msg: 'Otp Verified' }
}
module.exports = {
    generatePhoneOtp,
    verifyOtp
}