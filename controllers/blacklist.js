// 关于黑名单的操作

// 环境
const jwt = require('jsonwebtoken')
const { User } = require('../models')
const { BlackList } = require('../models')
const config = require('../keys')

// 枚举黑名单
const listAll = (async(req, res) => {
    const items = await BlackList.find()
    res.send(items)
})

// 查询黑名单
const search = (async(req, res) => {
    console.log(req.body)
    const item = await BlackList.findOne({
        QQ: req.body.QQ
    })
    console.log(item)
    if(!item){
        res.send({
            s: "查无此人",
            QQ: req.body.QQ
        })
    }else{
        res.send(item)
    }
    
})

// 添加黑名单
const add = (async(req, res) => {
    console.log(req.body)
    const item = await BlackList.create({
        QQ: req.body.QQ,
        name: req.body.name,
        level: req.body.level,
        reason: req.body.reason,
        addDate: new Date()
    })
    res.send(item)
})

// 清空黑名单
const clear = (async(req,res) => {
    console.log('清空黑名单中...')
    const msg = await BlackList.remove()
    res.send(msg)
})


// 导出
module.exports = {
    listAll,
    search,
    add,
    clear
}