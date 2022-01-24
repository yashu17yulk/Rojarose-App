const express = require("express");
const router = express.Router();
const Controller = require("../controllers/index");

router.post("/send", Controller.notification.SendNotification);

module.exports = router;
