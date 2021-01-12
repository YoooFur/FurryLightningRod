const mongoose = require('mongoose')
const uri = require('./keys').dbURI

mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    //useUnifiedTopology: true
}, function(err){
    if(err){
        console.log('数据库连接失败');
    }else{
        console.log('数据库连接成功');
    }
})


// users集合 数据模型

const User = mongoose.model('User', new mongoose.Schema({
    username: { type: String, unique: true },
    password: {
        type: String,
        set(val){
            return require('bcryptjs').hashSync(val, 10)
        }
    },
    nick: { type: String },
    group: { type: String },
    email: { type: String, unique: true },
    QQ: { type: String, unique: true }
}))


// User.db.dropCollection('users')

module.exports = {
    User
}