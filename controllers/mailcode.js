// 配置环境
const nodemailer = require('nodemailer')
const config = require('../keys')
const { VerifyCode } = require('../models')
const { User } = require('../models')
const jwt = require('jsonwebtoken')

// 生成验证码
const createCode = async function(email) {
    let str = '0123456789'
    let cstr = '0123456789ABCDEF'
    let arr = ''
    let crr = ''
    for (let i=0; i<6; i++) {
        arr += str.charAt(Math.random() * str.length | 0)
        crr += cstr.charAt(Math.random() * cstr.length | 0)
    }
    const eCode = await VerifyCode.create({
        id: crr,
        code: arr,
        email: email
    })
    console.log(eCode)
    return eCode
}

// 验证邮箱格式
function checkEmail(email) {
    const reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/; //正则表达式
    if (!reg.test(email)) { //正则验证不通过，格式不对
        return 'error'
    } else {
        return null
    }
}



// 发送验证码（POST调用
const codeSend = async(req, res) => {
    console.log(req.body)
    const toEmail = req.body.email
    const username = req.body.username
    if(!toEmail){return res.status(422).send({message: '请填写邮箱'})}
    if(checkEmail(toEmail)){return res.status(422).send({message: '邮箱格式不正确'})}
    if(await User.findOne({username:username})){return res.status(422).send({message: '用户名已存在'})}
    if(await User.findOne({email:toEmail})){return res.status(422).send({message: '邮箱已存在'})}
    const eCode = await createCode(toEmail)
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
        subject: '避雷针注册验证码',
        html: '<head><style>*{font-family: "微软雅黑", "Microsoft Yahei", "苹方", "Pingfang SC";}</style></head><body><h3>避雷针</h3><p>感谢您使用避雷针，以下是您的注册验证码：<strong>' + eCode.code + '</strong><p>如果您近期并没有注册避雷针，请忽略该邮件<hr><p>如果您有好的建议或者反馈，请联系colour_93@furry.top<p>&copy; YoooFur+工作室 2020-2021'
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

// 核验验证码（POST调用
const codeVerify = async(req, res) => {
    console.log(req.body)
    const code = req.body.code
    const id = req.body.id
    const email = req.body.email
    const verifyData = await VerifyCode.findOne({
        id: id
    })
    if (!verifyData) {
        return res.status(422).send({
            message: '验证码不存在'
        })
    }
    if (email!=verifyData.email||code!=verifyData.code) {
        return res.status(422).send({
            message: '验证码无效'
        })
    }
    // token
    const reg_token = jwt.sign({
        _id: String(verifyData._id),
    }, config.SECRET)
    res.send({reg_token})
}

// 枚举验证码
const get = async(req, res) => {
    const c = await VerifyCode.find()
    res.send(c)
}

// 清空验证码
const del = async(req, res) => {
    const c = await VerifyCode.remove()
    res.send(c)
}

module.exports = {
    codeSend,
    codeVerify,
    get,
    del
}