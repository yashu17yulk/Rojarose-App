const Models = require('../../models/index');
const Utility = require('../../utility/Utility')
const messages = require('../../messages/messages')
const responseCode = require('../../utility/responseCode');

//***** CREATE THEME *****//
async function createTheme(id, data) {
    const isExist = await Models.theme.findOne({ userId: id });
    if (isExist) {
        const upadatedTheme = await Models.theme.findOneAndUpdate({ userId: id }, data, { new: true });
        return upadatedTheme
    }
    const qry = {
        userId: id,
        borderSize: data.borderSize,
        curveTop: data.curveTop,
        curveButton: data.curveButton,
        theme: data.theme
    }
    const dataToSend = await Models.theme.create(qry);
    await Models.user.findOneAndUpdate({ _id: id }, { themeId: dataToSend._id })
    return dataToSend
};

module.exports = {
    createTheme
}