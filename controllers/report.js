// 关于举报申诉的操作

// 环境
const jwt = require('jsonwebtoken')
const { User } = require('../models')
const { BlackList } = require('../models')
const { ReportList } = require('../models')
const { mailSend } = require('../controllers/mailer')
const config = require('../keys')


// 提交申请
const add = (async(req, res) => {
    console.log(req.body)
    if(!req.body.QQ||!req.body.name||!req.body.reason){
        res.status(422).send({message: '请将信息填写完全'})
    }else{
        if(await BlackList.findOne({QQ:req.body.QQ})){
            res.status(422).send({message: '黑名单已存在，如果需要添加原因，请联系玖叁'})
        }else{
            if(await ReportList.findOne({QQ:req.body.QQ})&&await ReportList.findOne({reporter:req.user._id})){
            res.status(422).send({message: '请不要重复举报，如果需要添加原因或者有其他需求，请联系玖叁'})
            }else{
                const item = await ReportList.create({
                    // id: new BlackList.count,
                    QQ: req.body.QQ,
                    status: 'pending',
                    name: req.body.name,
                    reason: req.body.reason,
                    imagePath: req.body.imgPath,
                    reporter: req.user._id,
                    reporterName: req.user.nick,
                    addDate: new Date()
                })
                res.send({message: '操作成功完成，审核通过将会邮件通知您'})
                const tname = await User.findOne({username: 'Krstar'})
                mailSend(tname)
            }
        }
    }
})

// 导出
module.exports = {
    add,
}