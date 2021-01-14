function login() {
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    $.ajax({
        url: 'http://192.168.31.101:3001/api/login',
        type: 'POST',
        data: 
        {
            username: username,
            password: password
        },
        dataType: 'json',
        error: function(XHR,TS) {
            $('div.error').removeClass('d-none')
            $('div.success').addClass('d-none')
        },
        success: function(data) {
            $('div.success').removeClass('d-none')
            $('div.error').addClass('d-none')
            document.cookie="token="+data.token
            console.log(document.cookie)
            setTimeout(function(){window.location.href='/'},2500);
        }
    })
}
