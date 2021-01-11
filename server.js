const { User } = require('./models')
const express = require('express')
const jwt = require('jsonwebtoken')
const SECRET = require('./keys').SECRET

const port = 3001


const app = express()
app.use(express.json())

app.get('/', async(req, res) => {
    res.send('ok')
})



// 枚举列表
app.get('/api/users', async(req, res) => {
    const users = await User.find()
    res.send(users)
})


// 注册
app.post('/api/register', async(req, res) => {
    console.log(req.body)
    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
    })
    res.send(user)
})


// 登录
app.post('/api/login', async(req, res) => {
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
    }, SECRET)
    res.send({
        user,
        token
    })
})

// auth中间件
const auth = async(req, res, next) => {
    const raw = String(req.headers.authorization).split(' ').pop()
    const { _id } = jwt.verify(raw, SECRET)
    req.user = await User.findById(_id)
    next()
}

// GET用户资料
app.get('/api/profile', auth, async(req, res) => {
    res.send(req.user)
})

//监听
app.listen(port, () => {
    console.log('API服务已启动，监听端口:'+port)
    console.log('SECRET:'+SECRET)
})