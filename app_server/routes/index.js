var express = require('express');
var router = express.Router();
const ctrlMain = require('../controllers/main');

//根
router.get('/', ctrlMain.index);

//个人主页
router.get('/space', ctrlMain.space)

//个人信息修改
router.get('/profile', ctrlMain.profile)

//查询
router.get('/search', ctrlMain.search)
router.get('/search/:target_qq', ctrlMain.search)

module.exports = router;
