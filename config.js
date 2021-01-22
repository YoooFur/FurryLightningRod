// 参数

// 环境
const env = 'dev'

// 监听端口 
// 发布环境3000 本地服务器2997 测试环境2998
const listenPort = 2998

// API地址
// const APIURL = 'api.deadlist.fun:29999'
const APIURL = 'http://test.furrylightningrod.com:29998/api'
// const APIURL = 'http://localhost:3001/api'

// 前端版本
const i_version = '1.0.10'

module.exports = {
    listenPort,
    env,
    APIURL,
    i_version
}