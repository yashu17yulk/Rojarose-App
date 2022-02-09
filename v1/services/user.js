const Models = require("../../models/index");
const Utility = require("../../utility/Utility");
const messages = require("../../messages/messages");
const responseCode = require("../../utility/responseCode");
const services = require("./index");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const FCM = require("fcm-node");
const moment = require("moment");
const otp = Math.floor(100000 + Math.random() * 900000);
const ObjectId = mongoose.Types.ObjectId;

/*************************************************************************************************************
 **************************************ONBOARDING**************************************************************
 *************************************************************************************************************/

//***** SIGNUP *****//
async function signUp(data) {
  const arr = data.userName.split(" ");
  if (arr.length > 1)
    throw messages.MESSAGES.CAN_NOT_USE_WHITESPACE_IN_USERNAME;
  const isExist = await Models.user.findOne({ phone: data.phone });
  if (isExist) {
    throw messages.MESSAGES.USER_ALREADY_EXISTS;
  }
  data.password = await Utility.hashPasswordUsingBcrypt(data.password);
  const user = await Models.user.create(data);
  if (!user) {
    throw responseCode.BAD_REQUEST;
  }
  await Models.otp.deleteMany({ phone: data.phone });
  await Models.otp.create({ code: otp, phone: data.phone });
  let dataToSend = await Utility.jwtSign({_id: user._id});
  // const msg = messages.MESSAGES.OTP_SENT
  // const dataToSend = { user, msg  }
  //  return dataToSend

  return {
    token: dataToSend,
    message: messages.MESSAGES.SIGN_UP_SUCCESSFULLY,
    user: user,
  };
}

//***** SOCIAL_LOGIN *****//
async function isSocialLogin(data) {
  const qry = {
    socialId: data.socialId,
    socialType: data.socialType,
    isDeleted: false,
  };
  let user = await Models.user.findOne(qry);
  if (!user) {
    user = await Models.user.create(data);
  }
  const payload = user.socialId;
  console.log(payload);
  const token = await Utility.jwtSign(payload);
  return { user, token };
}

//***** LOGIN *****//
async function login(data) {
  const user = await Models.user.findOne(
    { phone: data.phone, isPhoneVerified: true },
    { password: 1 }
  );
  if (!user) {
    throw messages.MESSAGES.SIGN_UP_FIRST;
  }
  let isMatch = await Utility.comparePasswordUsingBcrypt(
    data.password,
    user.password
  );
  if (isMatch !== true) {
    throw messages.MESSAGES.INVALID_CREDENTAILS;
  }
  let dataToSend = await Utility.jwtSign({_id: user._id});
  return {
    token: dataToSend,
    message: messages.MESSAGES.LOGGED_IN_SUCCESSFULLY,
  };
}

//***** RESET PASSWORD *****//
async function resetPassword(phone, data) {
  console.log(data);
  data.newPassword = await Utility.hashPasswordUsingBcrypt(data.newPassword);
  // const dataToSend = await Models.user.findByIdAndUpdate(userId, { newPassword: data.newPassword });
  const dataToSend = await Models.user.findOneAndUpdate(
    { phone: phone },
    { password: data.newPassword }
  );
  if (!dataToSend) {
    throw { message: messages.MESSAGES.SOMETHING_WENT_WRONG };
  }
  return {
    message: messages.MESSAGES.YOUR_PASSWORD_HAS_BEEN_RESET_SUCCESSFULLY,
  };
}

//***** UPDATE PROFILE
async function updateProfile(id, data) {
  if (data.password) {
    data.password = await Utility.hashPasswordUsingBcrypt(data.password);
  }
  return Models.user.findByIdAndUpdate(
      {_id: id, isDeleted: false},
      data,
      {new: true}
  );
}

//***** GET PROFILE *****//
async function getProfile(id) {
  return Models.user.findById(id);
}

//***** GET Mates *****//
async function getMates(id, query) {
  console.log("id");
  let skip = parseInt(query.page - 1) || 0;
  let limit = parseInt(query.size) || 10;
  skip = skip * limit;
  let mate = await Models.mate.findOne({ userId: id });
  let qry = {
    age: { $gt: mate.age - 3, $lt: mate.age + 3 },
    bodyType: mate.bodyType,
    eyecolor: mate.eyecolor,
    haircolor: mate.haircolor,
    skinColor: mate.skinColor,
    education: mate.education,
    salary: mate.salary,
    work: mate.work,
    firstResponder: mate.firstResponder,
    ethnicity: mate.ethnicity,
    maritalStatus: mate.maritalStatus,
    activities: mate.activities,
    musicGenres: mate.musicGenres,
    distance: mate.distance,
    isDeleted: false,
    isBlocked: false,
    isPhoneVerified: true,
  };
  let projection = {
    work: 1,
    ethnicity: 1,
    name: 1,
    age: 1,
    images: 1,
    bio: 1,
    activities: 1,
  };
  return Models.user
      .find(qry, projection)
      .populate("themeId", "theme, borderSize", "curveButton", "curveTop")
      .limit(limit)
      .skip(skip);
}

// /*GET USER BY ID*/
// async function getUserById(id) {
//   const projection = {
//     activities: 1,
//     bio: 1,
//     name: 1,
//     ethnicity: 1,
//   }
//   const dataToSend = await Models.user.findById(id, projection);
//   if (!dataToSend) {
//     throw messages.MESSAGES.USER_NOT_FOUND
//   }
//   return dataToSend
// }


//*   Send Request  *//
async function sendRequest(userId, data) {
  const isExist = await Models.user.find({
    _id: data.receiverId,
    isDeleted: false,
  });
  if (!isExist) {
    throw messages.MESSAGES.USER_NOT_FOUND;
  }
  const qry = {
    senderId: userId,
    receiverId: data.receiverId,
    isRequestSent: data.isRequestSent,
    isRequestRemoved: data.isRequestRemoved,
  };
  const request = await Models.friendRequest.create(qry);
  let payload = {
    msg: "Friend request sent",
    id: data.receiverId,
  };

  const isDocUpdated = await Models.user.findByIdAndUpdate();

  const msg = await Utility.sendNotification(payload);
  await Models.friend.create({ userId: userId, friendId: data.receiverId });
  const notification = await Models.notification.create({
    title: msg.title,
    body: msg.body,
    userId: userId,
  });
  return {
    notification,
    request,
  };
}

//***** GET REQUESTS *****//
async function getRequests(id) {
  const qry = {
    receiverId: id,
    isRequestSent: true,
    isRequestAccepted: false,
  };
  const count = await Models.friendRequest.countDocuments({
    isRequestAccepted: false,                  // changes  false to true
    senderId: id,
  });
  const dataToSend = await Models.friendRequest.find(qry).populate([{
    path:"receiverId",
    select:"name profileImage"
  }]);
  return {
    count,
    dataToSend,
  };
}

//***** ACCEPT FRIEND REQUEST *****//
async function acceptFriendRequest(id, userId, data) {
  const qry = {
    isRequestAccepted: data.isRequestAccepted,
    isRequestDeleted: data.isRequestDeleted,
  };
  const dataToSend = await Models.friendRequest.findOneAndUpdate(
    { senderId: id, receiverId: userId },
    qry,
    { new: true }
  );
  // console.log(dataToSend);
  const friend = await Models.friend.findOneAndUpdate(
    {
      friendId: userId,
      userId: dataToSend.receiverId,
    },
    { isFriend: true, friends: [dataToSend.receiverId] },
    { new: true }
  );
  return { dataToSend, friend };
}

//***** Get Notification *****//
async function getNotifications(id) {
  const projection = {
    message: 1,
    title: 1,
    image: 1,
    body: 1,
    createdAt: 1,
  };
  const qry = {
    userId: id,
    isDeleted: false,
  };
  const dataToSend = await Models.notification.find(qry,projection);
  return { dataToSend };
}

//***** Get Chats *****//
async function unFriendUser(id, data) {
  console.log(id);
  const qry = {
    userId: id,
    isUnfriend: data.isUnfriend,
    isFriend: data.isFriend,
    friendId: data.friendId,
    isReport: data.isReport,
  };
  return await Models.friend.create(qry);
}

//*****  Get NEAR BY USERS *****//
async function getNearByUsers(data) {
  // console.log("data==>",data);
  const long = parseFloat(data.longitude);
  const lat = parseFloat(data.latitude);
  return Models.user.find({
    userLocation: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [long, lat],
        },
        $maxDistance: 2000,
        $minDistance: 0,
      },
    },
  });
}

//***** LOGOUT USER *****//
async function logoutUser(id) {
  return Models.user.findOneAndUpdate(
      {_id: id},
      {deviceToken: null, isLogout: true}
  );
}
module.exports = {
  signUp,
  isSocialLogin,
  login,
  resetPassword,
  updateProfile,
  getProfile,
  getMates,
  // getUserById,
  sendRequest,
  acceptFriendRequest,
  getNotifications,
  getRequests,
  unFriendUser,
  getNearByUsers,
  logoutUser,
};
