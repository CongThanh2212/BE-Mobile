var express = require('express');
var router = express.Router();

const needLogin = require('../controller/needLoginCtl');

router.post('/add_collection', needLogin.addCollection)
router.post('/add_recently', needLogin.addRecently)
router.post('/delete_collection', needLogin.delCollection)

router.get('/recently', needLogin.recently)
router.get('/collection', needLogin.collection)

module.exports = router;
