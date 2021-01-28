// 配置环境
const nodemailer = require('nodemailer')
const config = require('../keys')
const { User } = require('../models')
const { ReportList } = require('../models')
const { BlackList } = require('../models')

// 发送邮件
const mailSend = (user) => {
    const toEmail = user.email
    const transporter = nodemailer.createTransport({
        host: "smtp.office365.com", // 邮件地址
        port: 587, // 端口
        secureConnection: true, // use SSL
        auth: {
            user: config.emailUser, // 邮箱账号
            pass: config.emailPwd // 邮箱的授权码
        }
    })
    const mailOptions = {
        from: '"避雷针" <furrylightningrod@outlook.com>',
        to: toEmail,
        subject: '黑名单条目审核通知',
        html: '<head><style>*{font-family: "微软雅黑", "Microsoft Yahei", "苹方", "Pingfang SC";}</style></head><body><h3>避雷针</h3><p>尊敬的审核组用户'+user.nick+'，</p><p>您有一条新的待处理信息，<a href="http://test.furrylightningrod.com:29998/report/mange">点此查看</a><hr><p>如果您有好的建议或者反馈，请联系colour_93@furry.top<p>&copy; YoooFur+工作室 2020-2021'
    }
    transporter.sendMail(mailOptions,function(err,msg){
        if(err){
            console.log(err)
        }else{
            res.status(200).send({id: eCode.id})
            transporter.close()
        }
    })
}

module.exports = {
    mailSend,
}