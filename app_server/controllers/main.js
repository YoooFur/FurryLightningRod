//环境
const { response } = require('express')
const { token } = require('morgan')
const { render } = require('pug')
const request = require('request')
const { renderPage } = require('./renderPage')
const auth = require('../controllers/auth')
const options = {
    api: require('../../config').APIURL
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

//cookies中是否包含token
let sdata = JSON
const isCookiesToken = (req) => {
    if(!req.cookies.token||req.cookies.token==='null'){
        sdata.userInfo = nullUser
    }else{
        console.log(req.user)
        sdata.userInfo = req.user
    }
}



//首页 请求
const index = (req, res) => {
    sdata.title = '避雷针 - 约稿避雷辅助工具'
    isCookiesToken(req)
    renderPage(req, res, 'index', sdata)
}


//个人信息修改 请求
const profile = (req, res) => {
    sdata.title = '修改个人信息 - 约稿避雷辅助工具'
    isCookiesToken(req)
    renderPage(req, res, 'profile', sdata)
}


//个人中心 请求
const space = (req, res) => {
    sdata.title = '个人中心 - 约稿避雷辅助工具'
    isCookiesToken(req)
    renderPage(req, res, 'profile_space', sdata)
}


//写完模块别忘导出
module.exports = {
    index,
    space,
    profile,
}