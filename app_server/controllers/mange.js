//环境
const { response } = require('express')
const { token } = require('morgan')
const { render } = require('pug')
const { renderPage } = require('./renderPage')
const request = require('request')
const auth = require('../controllers/auth')
const options = {
    api: require('../../config').APIURL,
    env: require('../../config').env
}

//渲染管理页面
const mange = (req, res) => {
    console.log(req.cookies)
    if(!req.cookies.token||(req.user.group!='test-group'&&req.user.group!='mange-painter'&&req.user.group!='manger'&&req.user.group!='admin')){
        res.status(404).render('error/404')
    }else{
        renderPage(req, res, 'mange',{
            title: '管理页面 - 约稿避雷辅助工具',
            userInfo: req.user
        })
    }
}


//写完模块别忘导出
module.exports = {
    mange
}