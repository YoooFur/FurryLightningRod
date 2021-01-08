var express = require('express');
var router = express.Router();
const ctrlMain = require('../controllers/main');

//路由请求 根
router.get('/', ctrlMain.index);

//路由请求 个人主页
router.get('/profile', ctrlMain.profile)

//路由请求 查询
router.get('/search', ctrlMain.search)

module.exports = router;
