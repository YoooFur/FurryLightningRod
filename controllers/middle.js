// 环境
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const { User } = require('../models')
const { BlackList } = require('../models')
const { VerifyCode } = require('../models')
const config = require('../keys')

// auth 中间件 get=>authorization
const auth = async(req, res, next) => {
    const raw = String(req.headers.authorization).split(' ').pop()
    const { _id } = jwt.verify(raw, config.SECRET)
    req.user = await User.findById(_id)
    next()
}

// authx 中间件 post=>body.token
// 我是菜鸡 模块化能力为0 的 v0.0.1 修补中间件
const authx = async(req, res, next) => {
    const raw = req.body.token
    const { _id } = jwt.verify(raw, config.SECRET)
    req.user = await User.findById(_id)
    next()
}

// authb 中间件 get=>authorization
// 我是菜鸡 模块化能力为0 的 黑名单操作权限认证 authorization v0.0.1 修补中间件
const authb = async(req, res, next) => {
    const raw = String(req.headers.authorization).split(' ').pop()
    const { _id } = jwt.verify(raw, config.SECRET)
    req.user = await User.findById(_id)
    if(req.user.group!='test-group'&&req.user.group!='mange-painter'&&req.user.group!='manger'&&req.user.group!='admin'){res.status(403).send('Permission denied.(xd)')}
    else{next()}
}

// authxb 中间件 post=>body.token
// 我是菜鸡 模块化能力为0 的 黑名单操作权限认证 v0.0.1 修补中间件
const authxb = async(req, res, next) => {
    const raw = req.body.token
    const { _id } = jwt.verify(raw, config.SECRET)
    req.user = await User.findById(_id)
    if(req.user.group!='test-group'&&req.user.group!='mange-painter'&&req.user.group!='manger'&&req.user.group!='admin'){res.status(403).send('Permission denied.(xd)')}
    else{next()}
}

// reg 中间件
const reg = async(req, res, next) => {
    const raw = req.body.reg_token
    const username = req.body.username
    const { _id } = jwt.verify(raw, config.SECRET)
    const result = await VerifyCode.findById(_id)
    const uexist = await VerifyCode.findOne({username:username})
    if(!result){req.body.verify=false}
    else{req.body.verify=true}
    if(uexist){req.body.userExist=true}
    else{req.body.userExist=false}
    next()
}


module.exports = {
    auth,
    authx,
    authb,
    authxb,
    reg
}