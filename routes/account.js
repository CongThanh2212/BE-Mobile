var express = require('express');
var router = express.Router();

const account = require('../controller/accountCtl');

router.post('/require_create', account.requireCreate)
router.post('/create', account.create)
router.post('/change_info', account.changeInfo)

router.get('/send_mail', account.sendMail)
router.get('/verification', account.verification)
router.get('/login', account.login)


module.exports = router;
