var express = require('express');
var router = express.Router();

const noNeedLogin = require('../controller/noNeedLoginCtl');

router.post('/add_number_of_read', noNeedLogin.addNumberOfRead)
router.post('/related', noNeedLogin.related)
router.post('/information_book', noNeedLogin.inforBook)

router.get('/all_book', noNeedLogin.allBook)
router.get('/limit_hot', noNeedLogin.limitHot)
router.get('/limit_new', noNeedLogin.limitNew)
router.get('/hot', noNeedLogin.hot)
router.get('/new', noNeedLogin.new)
router.get('/technology', noNeedLogin.technology)
router.get('/science', noNeedLogin.science)
router.get('/economy', noNeedLogin.economy)
router.get('/lifeSkill', noNeedLogin.lifeSkill)
router.get('/category', noNeedLogin.category)

module.exports = router;
