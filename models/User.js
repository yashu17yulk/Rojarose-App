const { string, number, array } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
const userModel = new Schema(
  {
    rooms: [
      {
        type: ObjectId,
        ref: "room",
      },
    ],
    profileImage: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      trim: true,
      default: "",
    },
    firstName: {
      type: String,
      trim: true,
      default: "",
    },
    middleName: {
      type: String,
      trim: true,
      default: "",
    },
    lastName: {
      type: String,
      trim: true,
      default: "",
    },
    userName: {
      type: String,
      trim: true,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    dob: {
      type: Date,
    },
    isSocialLogin: {
      type: Boolean,
      default: false,
    },
    isPhoneVerify: {
      type: Boolean,
      default: false,
    },
    isLogout: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isRequestSent: {
      type: Boolean,
      default: false,
    },
    isRequestReceived: {
      type: Boolean,
      default: false,
    },
    pendingFriendRequests: [
      {
        type: mongoose.Types.ObjectId,
        ref: "request",
      },
    ],
    password: {
      type: String,
      default: "",
      select: false,
    },
    newPassword: {
      type: String,
      default: "",
    },
    countryCode: {
      type: Number,
      trim: true,
    },
    socialId: {
      type: String,
    },
    socialType: {
      type: String,
      enum: ["FACEBOOK", "GOOGLE", "APPLE"],
    },
    deviceType: {
      type: String,
      enum: ["IOS", "ANDROID", "WEB"],
    },
    deviceToken: {
      type: String,
      default: "",
    },
    images: {
      type: [String],
    },
    bio: {
      type: String,
    },
    friendLists: {
      type: [String],
    },
    declinedRequests: {
      type: [String],
    },
    gender: {
      type: String,
      enum: ["MAN", "WOMAN", "TRANSGENDER"],
    },
    age: {
      type: Number,
    },
    sexuality: {
      type: String,
      enum: ["STARAIGHT", "GAY", "ASEXUAL", "BISEXUAL"],
    },
    height: {
      type: String,
      enum: ["TALL", "VERYTALL", "MEDIUM", "SHORT", "VERYSHORT"],
    },
    bodyType: {
      type: String,
      enum: [
        "THIN",
        "AVERAGE",
        "PETIT",
        "MUSCULAR",
        "ATHLETIC",
        "AFEWEXTRAPOUNDS",
      ],
    },
    religion: {
      type: String,
      SPIRITUAL: 3,
      enum: [
        "HINDU",
        "MUSLIM",
        "SPIRITUAL",
        "BUDDHISM",
        "CHRISTIAN",
        "ISLAM",
        "SIKHISM",
        "STHEISM",
      ],
    },
    activities: [
      {
        type: Number,
      },
    ],
    musicGenres: [
      {
        type: Number,
      },
    ],
    ethnicity: [
      {
        type: String,
      },
    ],
    work: {
      type: String,
      default: "",
    },
    isFirstResponder: {
      type: Boolean,
      default: false,
    },
    salary: {
      type: Number,
    },
    education: {
      type: String,
      default: "",
      trim: true,
    },
    targetPerson: {
      type: String,
      enum: ["MAN", "WOMAN", "EVERYONE"],
    },
    // friends: {
    //       type: Array
    // },
    // isUnFriend: {
    //       type: Boolean,
    //       default: false
    // },
    longestRelationship: {
      type: String,
      default: "",
      trim: true,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    fcmToken: {
      type: String,
      default: "",
      trim: true,
    },
    userLocation: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: [{ type: Number }],
    },
    mateId: {
      type: ObjectId,
      ref: "mate",
    },
    themeId: {
      type: ObjectId,
      ref: "theme",
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);
userModel.index({ userLocation: "2dsphere" });
userModel.index({ userName: "text" });
const User = mongoose.model("user", userModel);
module.exports = User;
