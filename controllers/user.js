// 关于用户的操作

// 环境
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const { User } = require('../models')
const { BlackList } = require('../models')
const { VerifyCode } = require('../models')
const config = require('../keys')


// 获取所有用户
const getUers = (async(req, res) => {
    const users = await User.find()
    res.send(users)
})

// 注册
const register = async(req, res) => {
    if(req.body.verify===false){return res.status(422).send({message: 'token失效或不存在，请刷新后重试'})}
    if(req.body.userExist===true){return res.status(422).send({message: '用户名已存在'})}
    console.log(req.body)
    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        active: true,
        nick: req.body.nick,
        avatarPath: '0.jpg',
        group: 'normal',
        email: req.body.email,
        QQ: req.body.QQ,
        regDate: new Date()
    })
    // token
    const token = jwt.sign({
        _id: String(user._id),
    }, config.SECRET)
    res.send({
        user,
        token
    })
}

// 添加
const add = (async(req,res) => {
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
            message: '用户名或密码不正确'
        })
    }
    const isPasswordValid = require('bcryptjs').compareSync(
        req.body.password,
        user.password
        )
    if (!isPasswordValid) {
        return res.status(422).send({
            message: '用户名或密码不正确'
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

// 更新用户信息
const update = async(req, res) => {
    const nuser = req.body
    let updateUser
    console.log(nuser)
    if(!nuser.avatarPath){
        updateUser = await User.findOneAndUpdate({
            _id:req.user._id
        },{
            username: nuser.username,
            nick: nuser.nick,
            QQ: nuser.QQ
        },{
            new: true
        })
    }else{
        updateUser = await User.findOneAndUpdate({
            _id:req.user._id
        },{
            username: nuser.username,
            nick: nuser.nick,
            QQ: nuser.QQ,
            avatarPath: nuser.avatarPath
        },{
            new: true
        })
    }
    res.send(updateUser)
}

// 删除
const clear = (async(req,res) => {
    await User.remove()
    console.log('集合被清空')
    res.send('ok')
})


// 导出控制器
module.exports = {
    getUers,
    register,
    add,
    login,
    update,
    clear
}