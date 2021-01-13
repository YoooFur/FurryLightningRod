var express = require('express')
var router = express.Router()
const ctrlMain = require('../controllers/main')
const ctrlSearch = require('../controllers/search')
const ctrlUser = require('../controllers/user')

//根
router.get('/', ctrlMain.index)

//用户登录注册
router.get('/login', ctrlUser.login)

//个人主页
router.get('/space', ctrlMain.space)

//个人信息修改
router.get('/profile', ctrlMain.profile)

//查询（传参第三个 m代表模板查询 n代表黑名单查询
router.get('/search', function(req, res) {
    ctrlSearch.renderSearch(req, res, 'b')
})
router.get('/search/:QQ', function(req, res) {
    ctrlSearch.search_api(req, res, 'b')
})
router.get('/model-search', function(req, res) {
    ctrlSearch.renderSearch(req, res, 'm')
})
// router.get('/model-search/:model-info', ctrlMain.search_api)

module.exports = router;
