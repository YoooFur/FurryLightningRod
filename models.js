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
        },
        required: true
    },
    active: { type: Boolean, require: true },
    nick: { type: String, required: true },
    group: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    QQ: { type: String, unique: true, required: true },
    lastLogon: { type: Date },
    regDate: { type: Date, required: true }
}))

// blacklist集合 数据模型
const BlackList = mongoose.model('BlackList', new mongoose.Schema({
    QQ: { type: String, unique: true, required:true },
    name: { type: String, required: true },
    level: { type: Number, required: true },
    reason: { type: String, required: true },
    imagePath: { type: String },
    addDate: { type: Date, required: true }
}))


module.exports = {
    User,
    BlackList
}