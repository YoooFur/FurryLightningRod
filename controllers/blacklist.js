// 关于黑名单的操作

// 环境
const jwt = require('jsonwebtoken')
const { User } = require('../models')
const { BlackList } = require('../models')
const config = require('../keys')


// 枚举黑名单
const listAll = (async(req, res) => {
    let items = {}
    items.items = await BlackList.find()
    items.user = req.user
    console.log(items)
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
    if(!req.body.QQ||!req.body.name||!req.body.level||!req.body.reason){
        res.status(422).send({message: '请将信息填写完全'})
    }else{
        if(await BlackList.findOne({QQ:req.body.QQ})){
            res.status(422).send({message: '黑名单已存在，如果需要添加原因，请联系玖叁'})
        }else{
            const item = await BlackList.create({
                // id: new BlackList.count,
                QQ: req.body.QQ,
                name: req.body.name,
                level: req.body.level,
                reason: req.body.reason,
                opreator: req.user._id,
                opreatorName: req.user.nick,
                addDate: new Date()
            })
            res.send({message: '操作成功完成'})
        }
    }
})

// 刷新操作员信息
const updateOpreatorName = async(req, res) => {
    console.log('刷新操作员信息中...')
    const result = await BlackList.find()
    // console.log(result)
    for(let i in result){
        // console.log(result[i].opreator)
        const user = await User.findOne({_id: result[i].opreator})
        await BlackList.findOneAndUpdate({
                _id: result[i]._id
            },{
                opreatorName: user.nick
            },{
                new: true
            })
    }
    res.send('ok')
}

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
    updateOpreatorName,
    clear
}