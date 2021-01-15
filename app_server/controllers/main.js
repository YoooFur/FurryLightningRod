//环境
const { response } = require('express')
const { token } = require('morgan')
const { render } = require('pug')
const request = require('request')
const auth = require('../controllers/auth')
const apiOptions = {
    server: require('../../config').APIURL
}
const nullUser = {
    _id: "0",
    nick: "0",
    avatarPath: "0.jpg",
    username: "0",
    group: "guest",
    email: "0",
    QQ: "0",
}

//渲染页面
const renderPage = (req, res, page, title) => {
    if(!req.cookies.token){
        res.render(page,{
            title: title,
            userInfo: nullUser
        })
    }else{
        console.log(req.user)
        res.render(page,{
            title: title,
            userInfo: req.user
        })
    }
}

//首页 请求
const index = (req, res) => {
    const page = 'index'
    const title = '避雷针 - 约稿避雷辅助工具'
    renderPage(req, res, page, title)
}


//个人主页 请求
const profile = (req, res) => {
    const page = 'profile'
    const title = '个人中心 - 约稿避雷辅助工具'
    renderPage(req, res, page, title)
}


//个人信息修改 请求
const space = (req, res) => {
    const page = 'profile_space'
    const title = '修改个人信息 - 约稿避雷辅助工具'
    renderPage(req, res, page, title)
}


//写完模块别忘导出
module.exports = {
    index,
    space,
    profile,
}