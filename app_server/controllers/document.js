// markdown文档

//环境
const { renderPage } = require('./renderPage')
const fs = require('fs')
const md = require('marked')
const { resolve } = require('path')


// 读取md文件
const readMD =  (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, function(err, data){
            if(err){
                console.log(err)
                reject('')
            }else{
                console.log(data)
                docu = md(data.toString())
                resolve(docu)
            } 
        })
    })
}

// 使用说明
const help = async(req, res) => {
    path = 'public/documents/HELP.md'
    let datas = {
        title: '帮助 - 约稿避雷辅助工具',
        docu: await readMD(path)
    };
    console.log(datas)
    renderPage(req, res, 'documents/help', datas)
    
}




module.exports = {
    help
}