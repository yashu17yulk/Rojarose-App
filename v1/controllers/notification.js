var FCM = require("fcm-notification");
const { user } = require("../../models");
const serverkey = require("../../rr-dating-app-firebase-adminsdk-ag5av-faa99ffc09.json");
var fcm = new FCM(serverkey);

async function SendNotification(req, res, next) {
  try {
    const { _id, title, body, data } = req.body;
    if (!_id || !title || !body || !data)
      return res.json({ success: false, error: "All field Required!" });
    const isUserExist = await user.findById(_id);
    
    if (!isUserExist)
      return res.json({ success: false, error: "User Not Exist!" });
    if (!isUserExist.fcmToken)
      return res.json({ success: false, error: "FCM Token not exist!" });
    var message = {
      data,
      notification: {
        title,
        body,
      },
      token: isUserExist.fcmToken,
    };

    fcm.send(message, function (err, response) {
      if (err)
        return res.json({ success: false, error: "Somethings went Wrong!" });
      return res.json({ success: true, error: null, response });
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  SendNotification,
};
