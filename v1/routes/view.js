const express             = require('express');
const Controller          = require('../controllers/index');
const router              = express.Router();
const Authorization       = require('../services/auth');

/************************************************************************************************************
***********************************************VIEW ROUTES***************************************************
************************************************************************************************************/

router.post('/',          Authorization.isUserAuth,          Controller.view.createView);
router.get('/',           Authorization.isUserAuth,          Controller.view.getView);

module.exports = router;