const responseCode = require("../../utility/responseCode");
const Utility = require("../../utility/Utility");
const Response = require("../../utility/response");
const Model = require("../../models/index");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const messages = require("../../messages/messages");
const config = require("../../config/imp");

exports.isUserAuth = async function (req, res, next) {
  try {
    if (req.headers.authorization) {
      let token = req.headers.authorization;
      if (token.startsWith("Bearer")) {
        token = token.substr("Bearer".length + 1);
      }
      const id = await Utility.jwtVerify(token);
      if (!id) {
        return Response.sendFailResponse(
          req,
          res,
          responseCode.UN_AUTHORIZED,
          messages.MESSAGES.INVALID_TOKEN
        );
      }
      const userData = await Model.user
        .findOne({ _id: mongoose.Types.ObjectId(id) })
        .lean()
        .exec();
      if (userData) {
        req.user = userData;
        next();
      } else {
        return Response.sendFailResponse(
          req,
          res,
          responseCode.UN_AUTHORIZED,
          messages.MESSAGES.INVALID_CREDENTAILS
        );
      }
    } else {
      return Response.sendFailResponse(
        req,
        res,
        responseCode.UN_AUTHORIZED,
        messages.MESSAGES.AUTH_TOKEN_MISSING
      );
    }
  } catch (error) {
    next(error);
  }
};

// module.exports = {
//     isUserAuth
// }
