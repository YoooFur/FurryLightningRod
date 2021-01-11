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


const User = mongoose.model('User', new mongoose.Schema({
    username: { type: String, unique: true},
    password: {
        type: String,
        set(val){
            return require('bcryptjs').hashSync(val, 10)
        }
    }
}))

// User.db.dropCollection('users')

module.exports = {
    User
}