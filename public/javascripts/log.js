const api_uri = 'http://api.furrylightningrod.com:3001/api'

function login() {
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    $('button').attr('disabled','true')
    $.ajax({
        url: api_uri+'/login',
        type: 'POST',
        data: 
        {
            username: username,
            password: password
        },
        dataType: 'json',
        error: function(XHR,TS) {
            $('div.alert').removeClass('alert-success')
            $('div.alert').addClass('alert-danger')
            $('div.alert').removeClass('d-none')
            $('p#alert').html(XHR.responseJSON.message)
            $('button').removeAttr('disabled','false')

        },
        success: function(data) {
            $('div.alert').removeClass('alert-danger')
            $('div.alert').addClass('alert-success')
            $('div.alert').removeClass('d-none')
            $('p#alert').html('登录成功，正在跳转...')
            document.cookie="token="+data.token
            setTimeout(function(){window.location.href='/'},1500);
        }
    })
}
function sendEmail() {
    const email = document.getElementById('email').value
    const username = document.getElementById('username').value
    $('button').attr('disabled','true')
    $.ajax({
        url: api_uri+'/mail/send',
        type: 'POST',
        data: 
        {
            email: email,
            username: username
        },
        dataType: 'json',
        error: function(XHR,TS) {
            $('div.alert').removeClass('alert-success')
            $('div.alert').addClass('alert-danger')
            $('div.alert').removeClass('d-none')
            $('p#alert').html(XHR.responseJSON.message)
            $('button').removeAttr('disabled','false')
        },
        success: function(data) {
            $('div.alert').removeClass('alert-danger')
            $('div.alert').addClass('alert-success')
            $('div.alert').removeClass('d-none')
            $('p#alert').html('验证码发送成功')
            localStorage.setItem('id',data.id)
            $('button.send').addClass('d-none')
            $('button.verify').removeClass('d-none')
            $('div.email_code').removeClass('d-none')
            $('button').removeAttr('disabled','false')
        }
    })
}
function verify() {
    const email = document.getElementById('email').value
    const id = localStorage.getItem('id')
    const code = document.getElementById('email_code').value
    $('button').attr('disabled','true')
    $.ajax({
        url: api_uri+'/mail/verify',
        type: 'POST',
        data: 
        {
            email: email,
            id: id,
            code: code
        },
        dataType: 'json',
        error: function(XHR,TS) {
            $('div.alert').removeClass('alert-success')
            $('div.alert').addClass('alert-danger')
            $('div.alert').removeClass('d-none')
            $('p#alert').html(XHR.responseJSON.message)
            $('button').removeAttr('disabled','false')
        },
        success: function(data) {
            $('div.alert').removeClass('alert-danger')
            $('div.alert').addClass('alert-success')
            $('div.alert').removeClass('d-none')
            $('p#alert').html('验证成功')
            localStorage.removeItem('id')
            localStorage.setItem('reg_token',data.reg_token)
            $('button.verify').addClass('d-none')
            $('button.register').removeClass('d-none')
            $('div.QQ').removeClass('d-none')
            $('div.password').removeClass('d-none')
            $('div.d-password').removeClass('d-none')
            $('button').removeAttr('disabled','false')
        }
    })
}
function register() {
    if(checkpassword()===false){return false}
    const reg_token = localStorage.getItem('reg_token')
    const username = document.getElementById('username').value
    const nick = document.getElementById('nick').value
    const email = document.getElementById('email').value
    const QQ = document.getElementById('QQ').value
    const password = document.getElementById('password').value
    $('button').attr('disabled','true')
    $.ajax({
        url: api_uri+'/register',
        type: 'POST',
        data: 
        {
            reg_token: reg_token,
            username: username,
            nick: nick,
            email: email,
            QQ: QQ,
            password: password
        },
        dataType: 'json',
        error: function(XHR,TS) {
            $('div.alert').removeClass('alert-success')
            $('div.alert').addClass('alert-danger')
            $('div.alert').removeClass('d-none')
            $('p#alert').html(XHR.responseJSON.message)
            $('button').removeAttr('disabled','false')
        },
        success: function(data) {
            $('div.alert').removeClass('alert-danger')
            $('div.alert').addClass('alert-success')
            $('div.alert').removeClass('d-none')
            $('p#alert').html('注册成功，正在跳转...')
            $('button').removeAttr('disabled','false')
            localStorage.removeItem('reg_token')
            document.cookie="token="+data.token
            setTimeout(function(){window.location.href='/'},1500);

        }
    })
}
function checkpassword() {
    var password = document.getElementById("password").value;
    var repassword = document.getElementById("d-password").value;
    if(password === repassword) {
        return true
     }else {
        $('div.alert').removeClass('alert-success')
        $('div.alert').addClass('alert-danger')
        $('div.alert').removeClass('d-none')
        $('p#alert').html('密码输入不一致')
        return false
     } 
}