//环境
const { response } = require('express')
const request = require('request')
const apiOptions = {
    server: require('../../config').APIURL
}

//首页 请求
const index = (req, res) => {
    res.render('index', {
        title: '避雷针 - 委托避雷辅助工具',
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


//查询 请求
const search = (req, res, resBody) => {
    console.log(resBody)
    res.render('search', {
        title: '查询 - 避雷针',
        resBody: resBody
    })
    console.log(resBody)
}

//query式请求 & wu'qing'qiu
const renderSearch = (req, res) => {
    let QQ
    if(req.query.target){
        QQ = req.query.target
        searchAPI(req, res, 'query')
    }else{
    res.render('search', {
        title: '查询 - 避雷针'
    })}
}

//查询 请求
const search_api = (req, res) => {
    searchAPI(req, res, 'params')
}

//查询公用POST
const searchAPI = (req, res, mode) =>{
    let t_QQ
    if(mode === 'params'){t_QQ=req.params.QQ}
    if(mode === 'query'){t_QQ=req.query.target}
    const requestOptions = {
        url: apiOptions.server+'/list',
        method: 'POST',
        json: { QQ: t_QQ }
    }
    request(
        requestOptions,
        (err, response, body) => {
            search(req, res, body)
            console.log(body)
        }
    )
}


//写完模块别忘导出
module.exports = {
    index,
    space,
    profile,
    renderSearch,
    search,
    search_api,
}