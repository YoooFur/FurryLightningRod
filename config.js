// 参数

// 环境
const env = 'dev'

// 监听端口 
// 发布环境3000 本地服务器2997 测试环境2998
const listenPort = 3000

// API地址
// const APIURL = 'api.deadlist.fun:29999'
const APIURL = 'https://api.furrylightningrod.com:29999/api'

// 前端版本
const i_version = '1.0.10'

module.exports = {
    listenPort,
    env,
    APIURL,
    i_version
}