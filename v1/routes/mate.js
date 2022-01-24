const express           = require('express');
const Controller        = require('../controllers/index')
const router            = express.Router();
const Authorization     = require('../services/auth')
/************************************************************************************************************
***********************************************MATE ROUTES***************************************************
************************************************************************************************************/

router.post('/',       Authorization.isUserAuth,      Controller.mate.createMate);
router.put('/',        Authorization.isUserAuth,      Controller.mate.updateMate);
router.get('/',        Authorization.isUserAuth,      Controller.mate.getMateById);
router.put('/delete',  Authorization.isUserAuth,      Controller.mate.deleteMate);
router.get('/search',  Authorization.isUserAuth,      Controller.mate.searchMates)

module.exports = router;
















// router.get('/getAll', Controller.mate.getAllMates)