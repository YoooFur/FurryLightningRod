//环境
const { response } = require('express')
const { renderPage } = require('./renderPage')
const request = require('request')
const options = {
    api: require('../../config').APIURL
}


//查询 请求
const search = (req, res, resBody, enter) => {
    console.log(resBody)
    renderPage(req, res,'search', {
        title: '查询 - 避雷针',
        enter: enter,
        resBody: resBody
    })
    console.log(resBody)
}

//query式请求 & 无请求
const renderSearch = (req, res, enter) => {
    let QQ
    console.log(enter)
    if(req.query.target){
        QQ = req.query.target
        searchAPI(req, res, 'query', enter)
    }else{
    renderPage(req, res, 'search', {
        title: '查询 - 避雷针',
        enter: enter
    })}
}

//查询 请求
const search_api = (req, res, enter) => {
    searchAPI(req, res, 'params', enter)
}

//查询公用POST
const searchAPI = (req, res, mode, enter) =>{
    let t_QQ
    if(enter === 'b'){requestPath='/list'}
    if(enter === 'm'){requestPath='/models/list'}
    if(mode === 'params'){t_QQ=req.params.QQ}
    if(mode === 'query'){t_QQ=req.query.target}
    const requestOptions = {
        url: options.api + requestPath,
        method: 'POST',
        json: { QQ: t_QQ }
    }
    request(
        requestOptions,
        (err, response, body) => {
            search(req, res, body, enter)
            console.log(body)
        }
    )
}


//写完模块别忘导出
module.exports = {
    renderSearch,
    search,
    search_api
}