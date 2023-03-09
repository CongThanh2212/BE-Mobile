var express = require('express');
var router = express.Router();

const account = require('../controller/accountCtl');

router.post('/require_create', account.requireCreate)
router.post('/create', account.create)
router.post('/change_info', account.changeInfo)
router.post('/send_mail', account.sendMail)
router.post('/login', account.login)

router.get('/verification', account.verification)


module.exports = router;
