//环境
const { response } = require('express')
const request = require('request')
const { renderPage } = require('./renderPage')
const options = {
    api: require('../../config').APIURL,
}


//登录
const login = (req, res) => {
    renderPage(req, res, 'log',{
        title: '登录 - 避雷针',
        enter: 'login'
 })
}


//注册
const register = (req, res) => {
    renderPage(req, res, 'log',{
        title: '注册 - 避雷针',
        enter: 'register'
    })
}

//登录 移动端
const mlogin = (req, res) => {
    renderPage(req, res, 'mlog',{
        title: '登录 - 避雷针',
        enter: 'login'
    })
}


//注册 移动端
const mregister = (req, res) => {
    renderPage(req, res, 'mlog',{
        title: '注册 - 避雷针',
        enter: 'register'
    })
}



//写完模块别忘导出
module.exports = {
    login,
    register,
    mlogin,
    mregister
}