const services = require("../services/index");
const Validations = require("../validators/index");
const responseCode = require("../../utility/responseCode");
const response = require("../../utility/response");
const APP_MESSAGES = require("../../language/eng");
const messages = require("../../messages/messages");
const { user } = require("../../models");

/***************************************************************************************
 *********************************ONBOARDING********************************************
 ***************************************************************************************/
/*SIGNUP*/
async function signUp(req, res, next) {
  try {
    await Validations.user.validateSignUp(req);
    let data = await services.user.signUp(req.body);
    return response.sendSuccessResponse(req, res, data, responseCode.OK);
  } catch (error) {
    next(error);
  }
}

/*SOCIAL LOGIN*/
async function isSocialLogin(req, res, next) {
  try {
    await Validations.user.validateSocialLogin(req);
    const data = await services.user.isSocialLogin(req.body);
    return response.sendSuccessResponse(req, res, data, responseCode.OK);
  } catch (error) {
    next(error);
  }
}
/*VERIFY OTP*/
async function verifyOtp(req, res, next) {
  try {
    await Validations.user.validateVerifyOtp(req);
    const data = await services.Otp.verifyOtp(req.body);
    return response.sendSuccessResponse(req, res, data, responseCode.OK);
  } catch (error) {
    next(error);
  }
}
/*LOGIN*/
async function login(req, res, next) {
  try {
    await Validations.user.validateLogin(req);
    let data = await services.user.login(req.body);
    return response.sendSuccessResponse(req, res, data, responseCode.OK);
  } catch (err) {
    console.log(err);
    next(err);
  }
}
/*FORGET PASSWORD*/
async function resetPassword(req, res, next) {
  try {
    // const userId = req.user._id;
    // console.log(req.body)
    const { phone } = req.body;
    await Validations.user.validateResetPassword(req);
    const data = await services.user.resetPassword(phone, req.body);
    return response.sendSuccessResponse(req, res, data, responseCode.OK);
  } catch (error) {
    next(error);
  }
}
/*UPDATE PROFILE*/
async function updateProfile(req, res, next) {
  try {
    await Validations.user.validateUpdateProfile(req);
    const id = req.user._id;
    const data = await services.user.updateProfile(id, req.body);
    return response.sendSuccessResponse(req, res, data, responseCode.OK);
  } catch (error) {
    next(error);
  }
}

/*GET PROFILE*/
async function getProfile(req, res, next) {
  try {
    const user = req.user;
    const data = await services.user.getProfile(user._id);
    return response.sendSuccessResponse(req, res, data, responseCode.OK);
  } catch (error) {
    next(error);
  }
}

/*GET MATES*/
async function getMates(req, res, next) {
  console.log("data");
  try {
    const user = req.user;
    const data = await services.user.getMates(user._id, req.query);
    return response.sendSuccessResponse(req, res, data, responseCode.OK);
  } catch (error) {
    next(error);
  }
}

// /*GET USER BY ID*/
// async function getUserById(req, res, next) {
//     try {
//         const data = await services.user.getUserById(req.params.id);
//         return response.sendSuccessResponse(req, res, data, responseCode.OK)
//     } catch (error) {
//         next(error)
//     }
// }

/*SEND REQUEST*/
async function sendRequest(req, res, next) {
  try {
    const userId = req.user._id;
    await Validations.user.validateSendRequest(req);
    const data = await services.user.sendRequest(userId, req.body);
    return response.sendSuccessResponse(req, res, data, responseCode.OK);
  } catch (error) {
    next(error);
  }
}

/*GET REQUESTS*/
async function getRequests(req, res, next) {
  try {
    const userId = req.user._id;
    const data = await services.user.getRequests(userId);
    return response.sendSuccessResponse(req, res, data, responseCode.OK);
  } catch (error) {
    next(error);
  }
}

/*ACCEPT FRIEND REQUEST*/

async function acceptFriendRequest(req, res, next) {
  try {
    const userId = req.user._id;
    const data = await services.user.acceptFriendRequest(
      req.params.id,
      userId,
      req.body
    );
    return response.sendSuccessResponse(req, res, data, responseCode.OK);
  } catch (error) {
    next(error);
  }
}
/*GET NOTIFICATIONS*/
async function getNotifications(req, res, next) {
  try {
    const user = req.user;
    const data = await services.user.getNotifications(user._id);
    console.log(data);
    return response.sendSuccessResponse(req, res, data, responseCode.OK);
  } catch (error) {
    next(error);
  }
}

/*UNMATCH USER*/
async function unFriendUser(req, res, next) {
  try {
    await Validations.user.validateUnFriendUser(req);
    const userId = req.user._id;
    const data = await services.user.unFriendUser(userId, req.body);
    return response.sendSuccessResponse(req, res, data, responseCode.OK);
  } catch (error) {
    next(error);
  }
}

/*GET NEAR BY USER*/

async function getNearByUsers(req, res, next) {
  try {
    console.log(req.body);
    const { lon, lat, miles } = req.body;
    // console.log("req.query==>",req.query);
    // const data = await services.user.getNearByUsers(req.query);
    // return response.sendSuccessResponse(req, res, data, responseCode.OK);

    const SearchQuery = {
      userLocation: {
        $geoWithin: {
          $centerSphere: [
            [parseFloat(lon), parseFloat(lat)],
            parseInt(miles) / 3963.2,
          ],
        },
      },
    };
    const result = await user.find(SearchQuery);
    return res.json({ success: true, result });
  } catch (error) {
    next(error);
  }
}

// async function getNearByUser (req, res) => {
//   const { lon, lat, miles } = req.body;
//   const SearchQuery = {
//     location: {
//       $geoWithin: {
//         $centerSphere: [
//           [parseFloat(lon), parseFloat(lat)],
//           parseInt(miles) / 3963.2,
//         ],
//       },
//     },
//   };

/*LOGOUT USER*/
async function logoutUser(req, res, next) {
  try {
    const userId = req.user._id;
    const data = await services.user.logoutUser(userId);
    return response.sendSuccessResponse(req, res, data, responseCode.OK);
  } catch (error) {
    next(error);
  }
}
module.exports = {
  signUp,
  verifyOtp,
  login,
  resetPassword,
  updateProfile,
  getProfile,
  getMates,
  // getUserById,
  sendRequest,
  getRequests,
  getNotifications,
  // getChats,
  acceptFriendRequest,
  unFriendUser,
  isSocialLogin,
  getNearByUsers,
  logoutUser,
};
