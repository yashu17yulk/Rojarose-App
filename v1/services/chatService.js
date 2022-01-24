const Models = require('../../models/index');
const Utility = require('../../utility/Utility');
const messages = require('../../messages/messages');

//**********   Get Chats  ************/
async function getchats(id) {
    const count = await Models.chat.count({ senderId: id, isReaded: false });
    const lastMessage = await Models.chat.find({ senderId: id }, { message: 1 }).sort({ timestamps: -1 })
    const onlineUsers = await Models.friend.find({ userId: id, isOnline: true })
    const qry = { senderId: id };
    const chats = await Models.chat.find(qry,
        {
            receiverId: 1,
            message: 1
        })
        .populate("receiverId", "images, userName")
    if (!chats) {
        throw 'no chat found'
    }
    const dataToSend = {
        chats,
        onlineUsers,
        count,
        lastMessage
    }
    return dataToSend
};

//**********   Create Chat  ************/
async function createChat(id, body) {
    const data = {
        receiverId: body.receiverId,
        senderId: id,
        message: body.message
    }
    const dataToSend = await Models.chat.create(data);
    return dataToSend;
}
 
// //**********   Get Chat By Id  ************/
// async function searchChats(userId, userName) {
//     let qry = {
//         senderId: userId,
//     }
//     console.log(userId);
//     const dataToSend = await Models.chat.findOne(qry)
//     // console.log(dataToSend);
//         // .populate(
//         //     'senderId',
//         //     'username',
//         //     {
//         //         $match: {
//         //             userName: {
//         //                 $regex: '.*' + userName + '.*'
//         //             }
//         //         }
//         //     }


//             // ,
//             // {
//             //     path: 'senderId',
//             //     match: {
//             //         userName: {
//             //             $regex: '.*' + userName + '.*'
//             //         }
//             //     }
//             // }
//         // );
//     return dataToSend
// }

//**********   Delete Chat  ************//
async function deleteChat(userId, friendId) {
    const dataToSend = await Models.chat.findOneAndDelete({ senderId: userId, receiverId: friendId })
    return dataToSend
}
module.exports = {
    getchats,
    createChat,
    // searchChats,
    deleteChat
}

