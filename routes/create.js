var express = require('express');
var router = express.Router();

const needLogin = require('../controller/createCtl');

router.post('/category', needLogin.newCategory)
router.post('/book', needLogin.newBook)

module.exports = router;
