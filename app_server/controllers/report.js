//环境
const { response } = require('express')
const { renderPage } = require('./renderPage')
const request = require('request')
const options = {
    api: require('../../config').APIURL
}

// //query式请求 & 无请求
// const renderSearch = (req, res, enter) => {
//     let QQ
//     console.log(enter)
//     if(req.query.target){
//         QQ = req.query.target
//         searchAPI(req, res, 'query', enter)
//     }else{
//     renderPage(req, res, 'search', {
//         title: '查询 - 避雷针',
//         enter: enter
//     })}
// }

//举报
const report = (req, res) => {
    let target = req.query.target
    if(!req.cookies.token){
        renderPage(req, res, 'error/needToLogin',{})
    }else{
    renderPage(req, res, 'report',{
        title: '举报 - 约稿避雷辅助工具',
        targetQQ: target
    })}
    
}

//写完模块别忘导出
module.exports = {
    report,
    
}