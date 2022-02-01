const express = require("express");
const router = express.Router();
const controller = require("../controllers/index");
const Authorization = require("../services/auth");
const services = require("../services/index");

const multer = require("multer");
const path = require("path");

const DIR = path.join(__dirname, '..' , "uploads");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

let upload = multer({ storage: storage });

/************************************************************************************************************
 ************************************************ONBOARDING***************************************************
 ************************************************************************************************************/
router.post("/", controller.user.signUp);
router.post("/socialLogin", controller.user.isSocialLogin);
router.post("/verifyOtp", controller.user.verifyOtp);
router.post("/login", controller.user.login);
router.post("/resetPassword", controller.user.resetPassword);
router.put("/", Authorization.isUserAuth, controller.user.updateProfile);
router.get("/", Authorization.isUserAuth, controller.user.getProfile);
router.get("/getMates", Authorization.isUserAuth, controller.user.getMates);
router.post("/request", Authorization.isUserAuth, controller.user.sendRequest);
router.get("/requests", Authorization.isUserAuth, controller.user.getRequests);
router.post("/acceptRequest/:id", Authorization.isUserAuth,controller.user.acceptFriendRequest);
router.post("/unFriend", Authorization.isUserAuth,controller.user.unFriendUser);
router.get("/notifications", Authorization.isUserAuth,controller.user.getNotifications);
router.post("/upload", Authorization.isUserAuth,upload.any("photo"),services.fileUpload.upload);
router.get("/nearBy", Authorization.isUserAuth, controller.user.getNearByUsers);
router.post("/logout", Authorization.isUserAuth, controller.user.logoutUser);

module.exports = router;
