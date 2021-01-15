//环境
const { response } = require('express')
const { token } = require('morgan')
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

//首页 请求
const index = (req, res) => {
    if(!req.cookies.token){
        res.render('index',{
            title:'避雷针 - 约稿避雷辅助工具',
            userInfo: nullUser
        })
    }else{
        console.log(req.user)
        res.render('index',{
            title: '避雷针 - 约稿避雷辅助工具',
            userInfo: req.user
        })
    }
}


//个人主页 请求
const profile = (req, res) => {
    res.render('profile', {
        title: '个人中心 - 避雷针',
        userInfo: {
            id: "0001",
            nick: "玖叁",
            username: "colour93",
            group: "normal",
            email: "colour_93@furry.top",
            QQ: "1285419578",
        }
    })
}


//个人信息修改 请求
const space = (req, res) => {
    res.render('profile_space', {
        title: "玖叁" + " - 避雷针",
        userInfo: {
            id: "0001",
            nick: "玖叁",
            username: "colour93",
            group: "mange-painter",
            email: "colour_93@furry.top",
            QQ: "1285419578",
        }
    })
}


//写完模块别忘导出
module.exports = {
    index,
    space,
    profile,
}