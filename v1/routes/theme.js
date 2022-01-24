const express = require('express');
const router = express.Router();
const Authorization = require('../services/auth');
const Controller = require('../controllers/index');

router.post('/',       Authorization.isUserAuth,        Controller.theme.createTheme);

module.exports = router