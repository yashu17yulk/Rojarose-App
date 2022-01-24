const express            = require('express');
const Controller         = require('../controllers/index')
const router             = express.Router();
const Authorization      = require('../services/auth')
/************************************************************************************************************
***********************************************VIEW ROUTES***************************************************
************************************************************************************************************/

router.post('/',         Authorization.isUserAuth,           Controller.like.createLike);
router.get('/',          Authorization.isUserAuth,           Controller.like.getLikes);

module.exports = router;