var express = require('express')
var router = express.Router()
const cookieParser = require('cookie-parser')
const ctrlMain = require('../controllers/main')
const ctrlSearch = require('../controllers/search')
const ctrlUser = require('../controllers/log')
const ctrlMange = require('../controllers/mange')
const ctrlDoc = require('../controllers/document')
const auth = require('../controllers/auth').auth

router.use(cookieParser())

//根
router.get('/', auth, async(req, res) => {
    ctrlMain.index(req, res)
})

//帮助
router.get('/help', ctrlDoc.help)

//用户登录注册
router.get('/login', ctrlUser.login)
router.get('/register', ctrlUser.register)
router.get('/mlogin', ctrlUser.mlogin)
router.get('/mregister', ctrlUser.mregister)

//个人主页
router.get('/space', auth, async(req, res) => {
    ctrlMain.space(req, res)
})

//个人信息修改
router.get('/profile', auth, async(req, res) => {
    ctrlMain.profile(req, res)
})

//内测管理页面
router.get('/mange', auth, async(req, res) => {
    ctrlMange.mange(req, res)
})

//查询（传参第三个 m代表模板查询 b代表黑名单查询
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
