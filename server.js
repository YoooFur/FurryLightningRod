// 环境
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const config = require('./keys')

// 载入控制器
const userCtrl = require('./controllers/user')
const listCtrl = require('./controllers/blacklist')
const sendCode = require('./controllers/mailcode')
const uploadAvatar = require('./controllers/upload_avatar')
const middle = require('./controllers/middle')

const port = 3001

const app = express()
app.use(express.json())
//只要加入这个配置，则在 req 请求对象上会多出来一个属性 ：body
//也就是说你就可以直接通过 req.body 来获取表单 POST 请求体数据了
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.static('files'))


// cors跨域配置
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, Current-Page');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method == 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});


app.get('/', async(req, res) => {
    res.send('ok')
})


//==============用户类操作==================


// 枚举列表
app.get('/api/users', userCtrl.getUers)

// 注册
app.post('/api/777/register', userCtrl.add)
app.post('/api/register', middle.reg, async(req, res) => {
    userCtrl.register(req, res)
})

// 登录
app.post('/api/login', userCtrl.login)

// GET用户资料
app.get('/api/profile', middle.auth, async(req, res) => {
    res.send(req.user)
    console.log(req.user)
})

// 上传头像
app.post('/api/upload/avatar', uploadAvatar.upload)

// 更新用户资料
app.post('/api/profile/update', middle.authx, async(req, res) => {
    userCtrl.update(req, res)
})

// 删除所有用户
// app.delete('/api/delete', userCtrl.clear)



//==============黑名单操作==================


// 枚举
app.get('/api/list/all', middle.authb, async(req, res) => {
    listCtrl.listAll(req, res)
})

// 查询
app.post('/api/list', listCtrl.search)

// 添加
app.post('/api/list/add', middle.authxb, async(req, res) => {
    listCtrl.add(req, res)
})

// 刷新操作员信息
app.post('/api/list/update/opreatorName', middle.authxb, async(req, res) => {
    listCtrl.updateOpreatorName(req, res)
})

// 清空
app.delete('/api/list/clear', listCtrl.clear)



//==============验证码操作==================


// 发送验证码测试
app.post('/api/mail/send', sendCode.codeSend)

// 验证验证码
app.post('/api/mail/verify', sendCode.codeVerify)

// 获取码表
app.get('/api/mail/get', sendCode.get)

// 清空
app.delete('/api/mail/clear', sendCode.del)


// test
// const { User } = require('./models')
// app.get('/api/test', async(req, res) => {
//     console.log(req.cookies)
// })


// 监听
app.listen(port, () => {
    console.log('API服务已启动，监听端口:'+port)
    console.log('SECRET:'+config.SECRET)
})