const express              = require('express');
const router               = express();
const userRoutes           = require('./user');
const mateRoutes           = require('./mate');
const likeRoutes           = require('./like');
const viewRoutes           = require('./view');
const chatRoutes           = require('./chat');
const themeRoutes          = require('./theme');
const notificationRoutes = require("./notification");

router.use('/user',        userRoutes);
router.use('/mate',        mateRoutes);
router.use('/like',        likeRoutes);
router.use('/view',        viewRoutes);
router.use('/chat',        chatRoutes);
router.use('/theme',       themeRoutes);
router.use("/notification", notificationRoutes);

module.exports = router;
