var express = require('express')
var router = express.Router()
const ctrlMain = require('../controllers/main')

//根
router.get('/', ctrlMain.index)

//个人主页
router.get('/space', ctrlMain.space)

//个人信息修改
router.get('/profile', ctrlMain.profile)

//查询
router.get('/search', ctrlMain.renderSearch)
router.get('/search/:QQ', ctrlMain.search_api)

module.exports = router;
