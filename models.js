const mongoose = require('mongoose')
const uri = 'mongodb://test:test@192.168.31.245/test'

mongoose.connect(uri, {
    useNewUrlParser: true,
    //useUnifiedTopology: true
}, function(err){
    if(err){
        console.log('数据库连接失败');
    }else{
        console.log('数据库连接成功');
    }
})


const User = mongoose.model('User', new mongoose.Schema({
    username: { type: String },
    password: { type: String }
}))


module.exports = {
    User
}