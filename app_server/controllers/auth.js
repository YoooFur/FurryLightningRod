//环境
const { response } = require('express')
const { NotExtended } = require('http-errors')
const request = require('request')
const ctrlMain = require('../controllers/main')
const apiOptions = {
    server: require('../../config').APIURL
}


// auth 中间件
const auth = async(req, res, next) => {
    console.log(req.cookies.token)
    if(req.cookies.token){
        if(req.cookies.token!=null){
            const requestOptions = {
                url: apiOptions.server + '/profile',
                method: 'GET',
                auth: {
                    bearer: req.cookies.token
                }
            }
            request(
                requestOptions,
                (err, response, body) => {
                    result(JSON.parse(body))
                }
            )
            const result = (Jbody) => {
                req.user = Jbody
                console.log(req.user)
                next()
            }
        }else{next()}
    }else{next()}
}


module.exports = {
    auth
}