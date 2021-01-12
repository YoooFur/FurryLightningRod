// 环境
const express = require('express')
const jwt = require('jsonwebtoken')
const config = require('./keys')

// 载入控制器
const userCtrl = require('./controllers/user')
const listCtrl = require('./controllers/blacklist')

const port = 3001

const app = express()
app.use(express.json())

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
})

// 删除所有用户
app.delete('/api/delete', userCtrl.clear)



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