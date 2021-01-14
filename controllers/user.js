// 关于用户的操作

// 环境
const jwt = require('jsonwebtoken')
const { User } = require('../models')
const { BlackList } = require('../models')
const config = require('../keys')


// auth 中间件
const auth = async(req, res, next) => {
    const raw = String(req.headers.authorization).split(' ').pop()
    const { _id } = jwt.verify(raw, config.SECRET)
    req.user = await User.findById(_id)
    next()
}

// 获取所有用户
const getUers = (async(req, res) => {
    const users = await User.find()
    res.send(users)
})

// 注册
const register = (async(req,res) => {
    console.log(req.body)
    if(!req.body.nick){var nnick = req.body.username}
    else{var nnick = req.body.nick}
    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        active: true,
        nick: nnick,
        group: 'normal',
        email: req.body.email,
        QQ: req.body.QQ,
        regDate: new Date()
    })
    res.send(user)
})

// 登录
const login = (async(req,res) => {
    console.log(req.body)
    const user = await User.findOne({
        username: req.body.username
    })
    if (!user) {
        return res.status(422).send({
            message: '用户名不存在'
        })
    }
    const isPasswordValid = require('bcryptjs').compareSync(
        req.body.password,
        user.password
        )
    if (!isPasswordValid) {
        return res.status(422).send({
            message: '密码无效'
        })
    }
    // token
    const token = jwt.sign({
        _id: String(user._id),
    }, config.SECRET)
    res.send({
        user,
        token
    })
})

// 删除
const clear = (async(req,res) => {
    await User.remove()
    console.log('集合被清空')
    res.send('ok')
})


// 导出控制器
module.exports = {
    auth,
    getUers,
    register,
    login,
    clear
}