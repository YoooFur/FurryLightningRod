const nodemailer = require('nodemailer')
const config = require('../keys')

const transporter = nodemailer.createTransport({
    host: "smtp.office365.com", // 邮件地址
    port: 587, // 端口
    secureConnection: true, // use SSL
    auth: {
        user: 'furrylightningrod@outlook.com', // 邮箱账号
        pass: 'Nc79112167' // 邮箱的授权码
    }
})

const send = (mailOptions) => {
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message send: %s', info.messageId);
    });
} 

const codeSend = function(){
    let emailCode = '000000' //验证码为6位随机数，这个自己用random（）写就行
    let email = {
        title: '邮箱验证码',
        htmlBody: '验证码测试' + emailCode + '233'
    }
    let mailOptions = {
        from: 'furrylightningrod@outlook.com', // 发件人地址
        to: 'colour_93@furry.top', // 收件人地址，多个收件人可以使用逗号分隔
        subject: email.title, // 邮件标题
        html: email.htmlBody // 邮件内容
    }
    send(mailOptions)
}

module.exports = {
    codeSend
}