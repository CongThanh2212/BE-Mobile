var express = require('express');
var router = express.Router();

const needLogin = require('../controller/needLoginCtl');

router.post('/add_collection', needLogin.addCollection)
router.post('/add_recently', needLogin.addRecently)
router.post('/delete_collection', needLogin.delCollection)
router.post('/recently', needLogin.recently)
router.post('/collection', needLogin.collection)
router.post('/collection_yes_or_no', needLogin.collectionYesOrNo)

module.exports = router;
