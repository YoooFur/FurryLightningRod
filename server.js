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

const port = 3001

const app = express()
app.use(express.json())
//只要加入这个配置，则在 req 请求对象上会多出来一个属性 ：body
//也就是说你就可以直接通过 req.body 来获取表单 POST 请求体数据了
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

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
app.post('/api/register', userCtrl.register)

// 登录
app.post('/api/login', userCtrl.login)

// GET用户资料
app.get('/api/profile', userCtrl.auth, async(req, res) => {
    res.send(req.user)
    console.log(req.user)
})

// 删除所有用户
app.delete('/api/delete', userCtrl.clear)

// 发送验证码测试
app.get('/api/sendcode', sendCode.codeSend)



//==============黑名单操作==================


// 枚举
app.get('/api/list/all', listCtrl.listAll)

// 查询
app.post('/api/list', listCtrl.search)

// 添加（直接
app.post('/api/list/add', listCtrl.add)

// 清空
app.delete('/api/list/clear', listCtrl.clear)



// 监听
app.listen(port, () => {
    console.log('API服务已启动，监听端口:'+port)
    console.log('SECRET:'+config.SECRET)
})