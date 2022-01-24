const express                             = require('express');
const Controller                          = require('../controllers/index')
const router                              = express.Router();
const Authorization                       = require('../services/auth');

router.get('/',                           Authorization.isUserAuth,   Controller.chat.getchats);
router.post('/',                          Authorization.isUserAuth,   Controller.chat.createChat);
router.get('/searchChat',                 Authorization.isUserAuth,   Controller.chat.searchChats);
router.delete('/:id',                     Authorization.isUserAuth,   Controller.chat.deleteChat);
module.exports = router;